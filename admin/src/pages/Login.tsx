import { useState, type FormEvent } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigate } from '../router';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@tactix.example');
  const [password, setPassword] = useState('demo');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--txi-bg-raider)',
        padding: 'var(--txi-space-4)',
      }}
    >
      <div
        style={{
          background: 'var(--txi-bg-card)',
          borderRadius: 'var(--txi-radius-lg)',
          boxShadow: 'var(--txi-shadow-card)',
          width: '100%',
          maxWidth: 400,
          padding: 'var(--txi-space-8)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--txi-font-headline)',
            fontWeight: 700,
            color: 'var(--txi-color-primary)',
            marginBottom: 'var(--txi-space-2)',
          }}
        >
          TACTIX Admin
        </h1>
        <p style={{ color: 'var(--txi-text-secondary)', marginBottom: 'var(--txi-space-6)' }}>
          Sign in with mock credentials
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--txi-space-3)' }}>
          <Input label="Email" type="email" placeholder="admin@tactix.example" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <span style={{ color: 'var(--txi-color-error)', fontSize: 'var(--txi-font-caption)' }}>{error}</span>}
          <Button type="submit" variant="primary" full loading={submitting}>
            Sign in
          </Button>
        </form>

        <div style={{ marginTop: 'var(--txi-space-6)', fontSize: 'var(--txi-font-caption)', color: 'var(--txi-text-muted)' }}>
          <p>Hardcoded mock auth → Ladmin token flow.</p>
          <p>
            Any credentials work (e.g. <code>admin@tactix.example</code> / <code>demo</code>).
          </p>
        </div>
      </div>
    </div>
  );
}
