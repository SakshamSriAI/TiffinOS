import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';

export const Login = () => {
  const [email, setEmail] = useState('owner@annapurnatiffins.com');
  const [password, setPassword] = useState('••••••••••••');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Frontend demo login
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white border border-mint/20 shadow-sm">
              <svg className="w-6 h-6 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                <line x1="12" y1="12" x2="12" y2="12.01" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-forest-deep">TiffinOS</span>
          </Link>
          <h1 className="text-xl font-bold text-charcoal">Sign in to Owner Dashboard</h1>
          <p className="text-xs text-muted-text">Authorized business owner access only</p>
        </div>

        <Card className="shadow-card border-border">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Owner Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                iconLeft={Mail}
                required={true}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconLeft={Lock}
                required={true}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-2"
                iconRight={ArrowRight}
              >
                Access Business Portal
              </Button>
            </form>

            <div className="mt-5 pt-4 border-t border-border/60 text-center">
              <p className="text-xs text-muted-text">
                Demo Mode: Click above to sign directly into the dashboard.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-xs text-forest font-semibold hover:underline">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
