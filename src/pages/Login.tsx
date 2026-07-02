import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle, getAuthErrorMessage } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/tasks');
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/tasks');
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">MateCode Tasks</h1>
          <p className="auth-subtitle">Inicia sesion para continuar</p>
        </div>

        <form onSubmit={handleEmailLogin} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contrasena"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesion...' : 'Iniciar sesion'}
          </button>
        </form>

        <div className="auth-divider">
          <span>o</span>
        </div>

        <button onClick={handleGoogleLogin} className="btn-google" disabled={loading}>
          <img src="https://www.google.com/favicon.ico" alt="Google" width={16} />
          Continuar con Google
        </button>

        <p className="auth-link">
          No tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </div>
    </div>
  );
}