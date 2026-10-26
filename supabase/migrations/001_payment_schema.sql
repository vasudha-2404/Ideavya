-- ============================================================
-- INNOVATEX IDEATHON — Payment Schema Migration
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────
-- 1. EVENT CONFIG (admin-configurable settings)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS event_config (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key           TEXT UNIQUE NOT NULL,
  value         TEXT NOT NULL,
  description   TEXT,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default config values
INSERT INTO event_config (key, value, description) VALUES
  ('registration_fee',    '499',            'Registration fee in smallest currency unit (paise). Set to 0 for free.'),
  ('currency',            'INR',            'Payment currency code (ISO 4217)'),
  ('event_name',          'INNOVATEX IDEATHON 2024', 'Display name for receipts and checkout'),
  ('registration_open',   'true',           'Whether registrations are accepting new entries'),
  ('max_team_size',       '4',              'Maximum members allowed per team'),
  ('razorpay_enabled',    'true',           'Whether Razorpay payment gateway is active')
ON CONFLICT (key) DO NOTHING;

-- ─────────────────────────────────────────────────────────
-- 2. REGISTRATIONS
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS registrations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  college         TEXT NOT NULL,
  team_name       TEXT,
  track           TEXT NOT NULL,
  participant_type TEXT NOT NULL DEFAULT 'individual' CHECK (participant_type IN ('individual', 'team')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- ─────────────────────────────────────────────────────────
-- 3. PAYMENT ORDERS (Razorpay order records)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payment_orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id   UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  razorpay_order_id TEXT UNIQUE NOT NULL,
  amount            INTEGER NOT NULL,           -- in paise
  currency          TEXT NOT NULL DEFAULT 'INR',
  status            TEXT NOT NULL DEFAULT 'created'
                      CHECK (status IN ('created', 'attempted', 'paid', 'failed', 'cancelled')),
  receipt           TEXT,
  attempts          INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(registration_id)                        -- Prevent duplicate orders per registration
);

CREATE INDEX IF NOT EXISTS idx_payment_orders_registration ON payment_orders(registration_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON payment_orders(status);

-- ─────────────────────────────────────────────────────────
-- 4. PAYMENT TRANSACTIONS (verified final records)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payment_transactions (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id       UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  payment_order_id      UUID REFERENCES payment_orders(id),
  razorpay_order_id     TEXT,
  razorpay_payment_id   TEXT UNIQUE,            -- NULL for free registrations
  razorpay_signature    TEXT,                   -- Stored for audit; verified before insert
  amount                INTEGER NOT NULL,
  currency              TEXT NOT NULL DEFAULT 'INR',
  status                TEXT NOT NULL
                          CHECK (status IN ('success', 'failed', 'cancelled', 'free', 'pending')),
  failure_reason        TEXT,
  method                TEXT,                   -- card, upi, netbanking, wallet
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  verified_at           TIMESTAMPTZ             -- When server-side verification completed
);

CREATE INDEX IF NOT EXISTS idx_payment_txn_registration  ON payment_transactions(registration_id);
CREATE INDEX IF NOT EXISTS idx_payment_txn_status        ON payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_payment_txn_payment_id    ON payment_transactions(razorpay_payment_id);

-- ─────────────────────────────────────────────────────────
-- 5. WEBHOOK LOG (for reconciliation & debugging)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS webhook_events (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type    TEXT NOT NULL,
  payload       JSONB NOT NULL,
  processed     BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 6. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────
ALTER TABLE event_config           ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events         ENABLE ROW LEVEL SECURITY;

-- event_config: everyone can read
CREATE POLICY "Public read event_config"
  ON event_config FOR SELECT USING (true);

-- registrations: anyone can insert; read own by email match (session var)
CREATE POLICY "Anyone can register"
  ON registrations FOR INSERT WITH CHECK (true);

CREATE POLICY "Users read own registration"
  ON registrations FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- payment_orders: service_role only for mutations; users read own
CREATE POLICY "Users read own payment orders"
  ON payment_orders FOR SELECT
  USING (
    registration_id IN (
      SELECT id FROM registrations
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- payment_transactions: same pattern
CREATE POLICY "Users read own transactions"
  ON payment_transactions FOR SELECT
  USING (
    registration_id IN (
      SELECT id FROM registrations
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Service role bypass (Edge Functions use service_role key, bypasses RLS)
-- No additional policy needed — service_role always bypasses RLS in Supabase

-- ─────────────────────────────────────────────────────────
-- 7. UPDATED_AT TRIGGER
-- ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_payment_orders_updated_at
  BEFORE UPDATE ON payment_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
