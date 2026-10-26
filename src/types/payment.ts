// ─── Supabase Table Types ─────────────────────────────────────────────────────

export interface EventConfig {
  id: string;
  key: string;
  value: string;
  description?: string;
  updated_at: string;
}

export interface EventSettings {
  registration_fee: number;       // in paise (0 = free)
  currency: string;               // 'INR'
  event_name: string;
  registration_open: boolean;
  max_team_size: number;
  razorpay_enabled: boolean;
  isFree: boolean;
  feeInRupees: number;
}

export type ParticipantType = 'individual' | 'team';

export interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  team_name?: string;
  track: string;
  participant_type: ParticipantType;
  created_at: string;
}

export type OrderStatus = 'created' | 'attempted' | 'paid' | 'failed' | 'cancelled';

export interface PaymentOrder {
  id: string;
  registration_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  receipt?: string;
  attempts: number;
  created_at: string;
  updated_at: string;
}

export type TransactionStatus = 'success' | 'failed' | 'cancelled' | 'free' | 'pending';

export interface PaymentTransaction {
  id: string;
  registration_id: string;
  payment_order_id?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  failure_reason?: string;
  method?: string;
  created_at: string;
  verified_at?: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
  registration_id: string;
  key_id: string;
  event_name: string;
  free?: boolean;
}

export interface VerifyPaymentResponse {
  success: boolean;
  payment_id?: string;
  amount?: number;
  already_verified?: boolean;
  error?: string;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface RegistrationFormData {
  full_name: string;
  email: string;
  phone: string;
  college: string;
  team_name: string;
  track: string;
  participant_type: ParticipantType;
}

// ─── Payment Flow State ───────────────────────────────────────────────────────

export type PaymentFlowStatus =
  | 'idle'
  | 'registering'
  | 'creating_order'
  | 'opening_checkout'
  | 'verifying'
  | 'success'
  | 'failed'
  | 'cancelled'
  | 'error';

export interface PaymentFlowState {
  status: PaymentFlowStatus;
  registrationId?: string;
  orderId?: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  error?: string;
  isFree?: boolean;
}

// ─── Admin Dashboard Types ────────────────────────────────────────────────────

export type AdminFilter = 'all' | 'success' | 'failed' | 'pending' | 'cancelled' | 'free';

export interface AdminPaymentRecord {
  transaction: PaymentTransaction;
  registration: Registration;
}
