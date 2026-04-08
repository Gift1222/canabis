import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  national_id?: string;
  role: 'farmer' | 'cooperative_rep' | 'cra_admin' | 'cra_reviewer';
  district?: string;
  region?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isFarmer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const MOCK_USERS: Record<string, User> = {
  'farmer@demo.mw': {
    id: 'user-001',
    full_name: 'John Banda',
    email: 'farmer@demo.mw',
    phone: '+265 999 123 456',
    national_id: 'MWI123456789',
    role: 'farmer',
    district: 'Lilongwe',
    region: 'central',
  },
  'admin@cra.gov.mw': {
    id: 'admin-001',
    full_name: 'Grace Phiri',
    email: 'admin@cra.gov.mw',
    phone: '+265 888 654 321',
    role: 'cra_admin',
    district: 'Lilongwe',
    region: 'central',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_USERS['farmer@demo.mw']);
  const loading = false;

  const login = async (email: string, _password: string) => {
    const mockUser = MOCK_USERS[email];
    if (mockUser) {
      setUser(mockUser);
    } else {
      setUser({
        id: 'user-' + Date.now(),
        full_name: email.split('@')[0].replace(/[._]/g, ' '),
        email,
        role: 'farmer',
        district: 'Lilongwe',
        region: 'central',
      });
    }
  };

  const register = async (userData: any) => {
    setUser({
      id: 'user-' + Date.now(),
      full_name: userData.full_name || 'New User',
      email: userData.email,
      phone: userData.phone,
      national_id: userData.national_id,
      role: userData.role || 'farmer',
      district: userData.district,
      region: userData.region,
    });
  };

  const logout = async () => { setUser(null); };
  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    setUser({ ...user, ...updates });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'cra_admin' || user?.role === 'cra_reviewer';
  const isFarmer = user?.role === 'farmer' || user?.role === 'cooperative_rep';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated, isAdmin, isFarmer }}>
      {children}
    </AuthContext.Provider>
  );
};
