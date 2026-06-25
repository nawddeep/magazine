import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToPublic: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToPublic }: AdminLoginProps) {
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await adminLogin(email, password);
      
      if (success) {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-12 relative"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Back button */}
      <button
        onClick={onBackToPublic}
        className="absolute top-6 left-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:text-[#c3f400] transition-colors"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Homepage
      </button>

      {/* Login Card */}
      <div 
        className="w-full max-w-md"
        style={{ 
          backgroundColor: 'var(--color-card-bg)',
          border: '2px solid var(--color-border-primary)'
        }}
      >
        {/* Header */}
        <div 
          className="px-8 py-6 border-b-2"
          style={{ borderColor: 'var(--color-border-primary)' }}
        >
          <div className="flex items-center justify-center mb-4">
            <div 
              className="w-16 h-16 flex items-center justify-center border-2"
              style={{ 
                borderColor: '#c3f400',
                backgroundColor: 'rgba(195, 244, 0, 0.1)'
              }}
            >
              <Lock className="w-8 h-8 text-[#c3f400]" />
            </div>
          </div>
          <h1 
            className="font-serif font-black text-3xl md:text-4xl uppercase text-center tracking-tighter italic"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Admin Access
          </h1>
          <p 
            className="font-mono text-xs text-center mt-2 uppercase tracking-widest"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Editorial CMS Authentication
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div 
              className="flex items-start gap-3 p-4 border-2 border-red-500"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-red-500 leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Default Credentials Info */}
          <div 
            className="p-4 border"
            style={{ 
              borderColor: 'var(--color-border-accent)',
              backgroundColor: 'rgba(195, 244, 0, 0.05)'
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Demo Credentials:
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--color-text-primary)' }}>
              <strong>Email:</strong> admin@vanguard.editorial
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--color-text-primary)' }}>
              <strong>Password:</strong> admin123
            </p>
          </div>

          {/* Email Input */}
          <div>
            <label 
              htmlFor="email"
              className="block font-mono text-xs uppercase mb-2 font-bold text-theme-secondary"
            >
              Administrator Email
            </label>
            <div className="relative">
              <Mail 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-tertiary"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@vanguard.editorial"
                className="w-full pl-12 pr-4 py-3 font-mono text-sm border-2 bg-theme-input border-theme-input text-theme placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-accent)] transition-colors rounded-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password"
              className="block font-mono text-xs uppercase mb-2 font-bold text-theme-secondary"
            >
              Secure Password
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-tertiary"
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 font-mono text-sm border-2 bg-theme-input border-theme-input text-theme placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-accent)] transition-colors rounded-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-theme-tertiary hover:text-[#c3f400] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--color-accent)] text-black font-mono text-sm uppercase tracking-wider font-extrabold py-4 hover:bg-[var(--color-primary)] hover:text-[var(--color-text-inverse)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin text-black">⟳</span>
                Authenticating...
              </span>
            ) : (
              'Access Admin Dashboard'
            )}
          </button>

          {/* Footer Info */}
          <div 
            className="pt-4 border-t text-center"
            style={{ borderColor: 'var(--color-border-secondary)' }}
          >
            <p 
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Vanguard Editorial CMS • Secure Authentication Portal
            </p>
          </div>
        </form>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute top-1/4 left-10 w-32 h-32 border opacity-10"
        style={{ borderColor: 'var(--color-border-primary)' }}
      />
      <div 
        className="absolute bottom-1/4 right-10 w-24 h-24 border opacity-10"
        style={{ borderColor: 'var(--color-border-primary)' }}
      />
    </div>
  );
}
