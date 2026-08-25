import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  FlaskConical,
  ChevronDown,
  ChevronUp,
  User,
  ShieldCheck,
  Eye,
  LayoutDashboard,
  FileText,
  CheckCircle,
  BarChart3,
  ClipboardCheck,
  Shield,
  Plus,
  Home,
  X,
} from 'lucide-react';

interface DemoPersona {
  label: string;
  email: string;
  role: string;
  color: string;
  accent: string;
  icon: React.ElementType;
  description: string;
  quickLinks: { label: string; path: string; icon: React.ElementType }[];
}

const PERSONAS: DemoPersona[] = [
  {
    label: 'Farmer / Applicant',
    email: 'farmer@demo.mw',
    role: 'farmer',
    color: 'bg-[#2D6A4F]',
    accent: 'border-[#3A7D44]',
    icon: User,
    description: 'John Banda — Individual Farmer, Lilongwe',
    quickLinks: [
      { label: 'My Dashboard', path: '/applicant/dashboard', icon: LayoutDashboard },
      { label: 'New Application', path: '/applicant/new-application', icon: Plus },
      { label: 'Application #001', path: '/applicant/application/CRA/06-2021/001', icon: FileText },
      { label: 'Home', path: '/', icon: Home },
    ],
  },
  {
    label: 'CRA Admin',
    email: 'admin@cra.gov.mw',
    role: 'cra_admin',
    color: 'bg-[#1B4D2E]',
    accent: 'border-[#C9A84C]',
    icon: ShieldCheck,
    description: 'Grace Phiri — Cannabis Regulatory Authority',
    quickLinks: [
      { label: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Applications', path: '/admin/applications', icon: FileText },
      { label: 'Licenses', path: '/admin/licenses', icon: CheckCircle },
      { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
      { label: 'Compliance', path: '/admin/compliance', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Guest / Public',
    email: '',
    role: 'guest',
    color: 'bg-slate-500',
    accent: 'border-slate-400',
    icon: Eye,
    description: 'Unauthenticated — public pages only',
    quickLinks: [
      { label: 'Home', path: '/', icon: Home },
      { label: 'License Types', path: '/license-types', icon: Shield },
      { label: 'Regulations', path: '/regulations', icon: ClipboardCheck },
      { label: 'Login', path: '/login', icon: User },
    ],
  },
];

export default function DemoBar() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  if (dismissed) return null;

  const activePersona = PERSONAS.find(p => p.email === user?.email)
    ?? (user ? PERSONAS[0] : PERSONAS[2]);

  const switchTo = async (persona: DemoPersona) => {
    if (persona.role === 'guest') {
      await logout();
      navigate('/');
    } else {
      await login(persona.email, 'demo');
      if (persona.role === 'cra_admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/applicant/dashboard');
      }
    }
    setExpanded(false);
  };

  const goTo = (path: string) => {
    navigate(path);
    setExpanded(false);
  };

  const ActiveIcon = activePersona.icon;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Expanded panel */}
      {expanded && (
        <div className="mb-2 bg-gray-950 border border-gray-700 rounded-2xl shadow-2xl w-[520px] max-w-[96vw] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest">
              DCLIS Demo Mode
            </span>
            <span className="ml-auto text-xs text-gray-500">Switch persona or navigate</span>
          </div>

          <div className="p-3 grid grid-cols-3 gap-2">
            {/* Persona switcher */}
            {PERSONAS.map(persona => {
              const Icon = persona.icon;
              const isActive = persona.email === user?.email || (persona.role === 'guest' && !user);
              return (
                <button
                  key={persona.role}
                  onClick={() => switchTo(persona)}
                  className={`rounded-xl p-3 text-left border-2 transition-all ${
                    isActive
                      ? `${persona.color} ${persona.accent} opacity-100`
                      : 'bg-gray-900 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {isActive && (
                      <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {persona.label}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                    {persona.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick nav links for active persona */}
          <div className="px-3 pb-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 px-1">
              Quick Nav — {activePersona.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activePersona.quickLinks.map(link => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => goTo(link.path)}
                    className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-lg transition-colors border border-gray-700 hover:border-gray-500"
                  >
                    <Icon className="w-3 h-3 text-gray-400" />
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pill toggle bar */}
      <div className="flex items-center gap-2 bg-gray-950 border border-gray-700 rounded-full px-3 py-2 shadow-2xl">
        <FlaskConical className="w-4 h-4 text-[#C9A84C] shrink-0" />
        <span className="text-xs text-[#C9A84C] font-semibold tracking-wide hidden sm:block">
          Demo
        </span>
        <div className="w-px h-4 bg-gray-700 mx-1 hidden sm:block" />

        {/* Active persona chip */}
        <div
          className={`flex items-center gap-1.5 ${activePersona.color} text-white text-xs font-medium px-2.5 py-1 rounded-full`}
        >
          <ActiveIcon className="w-3 h-3" />
          <span className="hidden sm:block">{activePersona.label}</span>
        </div>

        {/* Quick switch buttons */}
        {PERSONAS.filter(p => p.email !== activePersona.email).map(persona => {
          const Icon = persona.icon;
          return (
            <button
              key={persona.role}
              onClick={() => switchTo(persona)}
              title={`Switch to ${persona.label}`}
              className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-1.5 transition-colors border border-gray-700"
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}

        <div className="w-px h-4 bg-gray-700 mx-1" />

        {/* Expand/collapse */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-gray-400 hover:text-white transition-colors"
          title="Toggle demo panel"
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-600 hover:text-gray-400 transition-colors"
          title="Dismiss demo bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
