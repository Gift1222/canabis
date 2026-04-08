import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  national_id?: string;
  role: 'farmer' | 'cooperative_rep' | 'cra_admin' | 'cra_reviewer';
  cooperative_id?: string;
  district?: string;
  region?: string;
  created_at: string;
}

export async function registerUser(userData: {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  national_id?: string;
  role?: string;
  district?: string;
  region?: string;
}) {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (authError) {
      console.error('Auth error during user registration:', authError);
      throw authError;
    }

    if (!authData.user) {
      throw new Error('User creation failed - no user returned');
    }

    // Create user profile in KV store
    const userProfile: UserProfile = {
      id: authData.user.id,
      full_name: userData.full_name,
      email: userData.email,
      phone: userData.phone,
      national_id: userData.national_id,
      role: (userData.role as UserProfile['role']) || 'farmer',
      district: userData.district,
      region: userData.region,
      created_at: new Date().toISOString(),
    };

    await kv.set(`user:${authData.user.id}`, userProfile);
    await kv.set(`user:email:${userData.email}`, authData.user.id);

    return { user: userProfile, success: true };
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const profile = await kv.get<UserProfile>(`user:${userId}`);
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const existingProfile = await kv.get<UserProfile>(`user:${userId}`);
    if (!existingProfile) {
      throw new Error('User profile not found');
    }

    const updatedProfile = {
      ...existingProfile,
      ...updates,
      id: existingProfile.id, // Ensure ID doesn't change
    };

    await kv.set(`user:${userId}`, updatedProfile);
    return updatedProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function verifyToken(accessToken: string) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function checkAuthorization(
  accessToken: string,
  allowedRoles?: UserProfile['role'][]
) {
  const user = await verifyToken(accessToken);
  
  if (!user) {
    return { authorized: false, user: null, profile: null };
  }

  const profile = await getUserProfile(user.id);
  
  if (!profile) {
    return { authorized: false, user, profile: null };
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return { authorized: false, user, profile };
  }

  return { authorized: true, user, profile };
}
