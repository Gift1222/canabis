// MOCKUP MODE: All API calls are stubbed. No backend or Supabase required.

export const setAuthToken = (_token: string | null) => {};
export const getAuthToken = (): string | null => null;
export const clearAuthToken = () => {};
export const setUserProfile = (_profile: any) => {};
export const getUserProfile = (): any | null => null;

export const supabase = null;

export const authAPI = {
  checkSession: async () => false,
  login: async (_email: string, _password: string) => ({ profile: null, token: null }),
  register: async (_userData: any) => ({ user: null }),
  logout: async () => {},
  updateProfile: async (_id: string, _updates: any) => ({ profile: null }),
};
