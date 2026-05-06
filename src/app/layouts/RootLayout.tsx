import { Outlet, Link, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import {
  Menu,
  X,
  Home,
  FileText,
  Info,
  LogIn,
  LogOut,
  LayoutDashboard,
  Scale,
  User,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DemoBar from '../components/DemoBar';

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isApplicantRoute = location.pathname.startsWith('/applicant');

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/license-types', label: 'License Types', icon: FileText },
    { path: '/regulations', label: 'Regulations', icon: Scale },
  ];

  const handleLogout = async () => { await logout(); };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F9F6' }}>

      {/* Top notice bar — CRA gold */}
      <div style={{ backgroundColor: '#C9A84C' }} className="text-white text-xs py-1 px-4 text-center font-medium tracking-wide">
        Cannabis Regulatory Authority of Malawi &nbsp;|&nbsp; Regulating Hemp &amp; Medicinal Cannabis &nbsp;|&nbsp;
        <a href="tel:+265983436246" className="underline">+265 983 436 246</a>
      </div>

      {/* Main header — CRA deep green */}
      <header style={{ backgroundColor: '#1B4D2E' }} className="text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-1.5 flex items-center justify-center w-12 h-12 shadow-sm">
                <img
                  src="https://cra.mw/img/logo.png"
                  alt="CRA Logo"
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) parent.innerHTML = '<span style="font-size:22px">🌿</span>';
                  }}
                />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">DCLIS</div>
                <div className="text-xs leading-tight" style={{ color: '#C9A84C' }}>
                  Cannabis Regulatory Authority · Malawi
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {publicNavItems.map(item => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5"
                    style={{
                      backgroundColor: active ? '#163D25' : 'transparent',
                      color: active ? '#C9A84C' : 'rgba(255,255,255,0.85)',
                    }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = '#163D25'; }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}

              {isAuthenticated ? (
                <div className="flex items-center gap-2 ml-3">
                  {!isAdminRoute && !isApplicantRoute && (
                    <Link to={isAdmin ? '/admin/dashboard' : '/applicant/dashboard'}>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
                        style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {isAdmin ? 'Admin Portal' : 'My Dashboard'}
                      </button>
                    </Link>
                  )}
                  {(isAdminRoute || isApplicantRoute) && (
                    <Link to="/">
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium"
                        style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}
                      >
                        <Home className="w-4 h-4" />
                        Exit Portal
                      </button>
                    </Link>
                  )}
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <User className="w-3.5 h-3.5" />
                    <span>{user?.full_name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    style={{ backgroundColor: 'rgba(212,24,61,0.85)', color: 'white' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-3">
                  <Link to="/login">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium"
                      style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold"
                      style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}
                    >
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <div className="pt-3" />
              {publicNavItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-xs" style={{ color: '#C9A84C' }}>
                    Signed in as {user?.full_name}
                  </div>
                  <Link
                    to={isAdmin ? '/admin/dashboard' : '/applicant/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-md text-sm font-semibold"
                    style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-white"
                    style={{ backgroundColor: '#d4183d' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-md text-sm text-white"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>Login</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-md text-sm font-semibold"
                    style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}>Register</Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="pb-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F2A19' }} className="text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white rounded-lg p-1.5 w-10 h-10 flex items-center justify-center">
                  <img src="https://cra.mw/img/logo.png" alt="CRA" className="w-7 h-7 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }} />
                </div>
                <div>
                  <div className="font-bold text-base">Cannabis Regulatory Authority</div>
                  <div className="text-xs" style={{ color: '#C9A84C' }}>Republic of Malawi</div>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Regulating, controlling and monitoring the entire value chain of industrial hemp
                and medicinal cannabis in Malawi.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: '#C9A84C' }}>Contact</div>
              <div className="space-y-1 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <div>The Director General,</div>
                <div>Cannabis Regulatory Authority</div>
                <div>Post Office Box 30075,</div>
                <div>Lilongwe 3,</div>
                <div>Malawi.</div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: '#C9A84C' }}>Quick Links</div>
              <div className="space-y-1.5 text-sm">
                {[
                  { to: '/regulations', label: 'Regulations & Guidelines' },
                  { to: '/license-types', label: 'License Types' },
                  { to: '/about', label: 'About CRA' },
                  { to: '/login', label: 'Applicant Portal' },
                ].map(l => (
                  <Link key={l.to} to={l.to}
                    className="block transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                  >{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 text-center text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Cannabis Regulatory Authority of Malawi · Digital Cannabis Licensing &amp; Information System
          </div>
        </div>
      </footer>

      <DemoBar />
    </div>
  );
}
