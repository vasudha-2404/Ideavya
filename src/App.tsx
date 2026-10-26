import { BrowserRouter } from 'react-router-dom';
import { Component, type ReactNode, type ErrorInfo } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { IdeathonProvider } from './context/IdeathonContext';

// ── Error Boundary ────────────────────────────────────────────────────────────
interface ErrorBoundaryState { hasError: boolean; error: Error | null }

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#030712', color: '#f9fafb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif', padding: '2rem',
        }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#6366f1', color: 'white', border: 'none',
                padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
              }}
            >
              Reload Page
            </button>
            <details style={{ marginTop: '1.5rem', textAlign: 'left' }}>
              <summary style={{ color: '#6b7280', fontSize: '0.8rem', cursor: 'pointer' }}>
                Technical details
              </summary>
              <pre style={{
                marginTop: '0.5rem', padding: '0.75rem', background: '#111827',
                borderRadius: '0.5rem', fontSize: '0.75rem', color: '#f87171',
                overflowX: 'auto', whiteSpace: 'pre-wrap',
              }}>
                {this.state.error?.stack}
              </pre>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <IdeathonProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-1">
                <AppRoutes />
              </div>
              <Footer />
            </div>
          </IdeathonProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
