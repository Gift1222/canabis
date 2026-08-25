import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { FlaskConical, User, ShieldCheck } from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    label: 'Farmer / Applicant',
    email: 'farmer@demo.mw',
    password: 'demo',
    icon: User,
    color: 'bg-[#EBF4EE] border-[#3A7D44] hover:border-[#1B4D2E]',
    iconColor: 'text-[#1B4D2E]',
    redirectTo: '/applicant/dashboard',
  },
  {
    label: 'CRA Administrator',
    email: 'admin@cra.gov.mw',
    password: 'demo',
    icon: ShieldCheck,
    color: 'bg-[#F5EDD6] border-[#C9A84C] hover:border-[#A8892A]',
    iconColor: 'text-[#A8892A]',
    redirectTo: '/admin/dashboard',
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      const isAdmin = email.includes('cra') || email.includes('admin');
      navigate(isAdmin ? '/admin/dashboard' : '/applicant/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setLoading(true);
    try {
      await login(account.email, account.password);
      toast.success(`Logged in as ${account.label}`);
      navigate(account.redirectTo);
    } catch {
      toast.error('Quick login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <img
              src="/logo.png"
              alt="Cannabis Regulatory Authority Logo"
              className="w-24 h-24 md:w-28 md:h-28 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to DCLIS</h1>
          <p className="text-gray-600">Sign in to access your portal</p>
        </div>

        {/* Demo quick-login panel */}
        <div className="mb-6 rounded-xl border border-[#C9A84C] bg-[#F5EDD6] p-4">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-4 h-4 text-[#A8892A]" />
            <span className="text-sm font-semibold text-[#1B4D2E] font-semibold">Demo Mode — Quick Login</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map(account => {
              const Icon = account.icon;
              return (
                <button
                  key={account.email}
                  onClick={() => quickLogin(account)}
                  disabled={loading}
                  className={`flex items-start gap-2 p-3 rounded-lg border-2 text-left transition-all ${account.color} disabled:opacity-50`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${account.iconColor}`} />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{account.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{account.email}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-[#A8892A] mt-2">Any password works for demo accounts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Access your license applications and dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.banda@example.mw"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#1B4D2E] hover:underline">
                  Register here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
