import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerUser, clearError } from '../../redux/slices/authSlice';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(result)) {
      navigate('/problems');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-[var(--gradient-start)]/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-[var(--gradient-end)]/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
            <Code2 size={22} className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">CodeArena</span>
        </Link>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-2xl">
          <h2 className="mb-1 text-2xl font-bold text-[var(--text-primary)]">Create an account</h2>
          <p className="mb-6 text-sm text-[var(--text-muted)]">Start your coding journey today</p>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="text" value={name} onChange={(e) => { setName(e.target.value); dispatch(clearError()); }} required placeholder="John Doe"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--gradient-start)]" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); dispatch(clearError()); }} required placeholder="you@example.com"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--gradient-start)]" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); dispatch(clearError()); }} required placeholder="••••••••" minLength={6}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] py-2.5 pl-10 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition focus:border-[var(--gradient-start)]" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Already have an account? <Link to="/login" className="font-medium text-[var(--gradient-start)] hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
