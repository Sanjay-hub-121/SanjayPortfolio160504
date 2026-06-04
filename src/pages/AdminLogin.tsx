import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Eye, EyeOff, Code2, AlertCircle } from 'lucide-react';

const ADMIN_EMAIL = 'sanjayganeasnt@gmail.com';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(ADMIN_EMAIL, password);

    if (signInError) {
      setError('Invalid password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-600/6 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-400/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-4 glow-blue-sm">
            <Code2 size={24} className="text-blue-400" />
          </div>
          <h1 className="font-display font-bold text-white text-2xl">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-1">Portfolio management panel</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-blue-400" />
            <span className="text-sm font-semibold text-white">Secure Login</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-bg-elevated border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <>
                  <Lock size={15} />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            This panel is private and restricted.
          </p>
        </div>

        <p className="text-center text-xs text-slate-700 mt-4">
          <a href="/" className="hover:text-slate-500 transition-colors">Back to Portfolio</a>
        </p>
      </div>
    </div>
  );
}
