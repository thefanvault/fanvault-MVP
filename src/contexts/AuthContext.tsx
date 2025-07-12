import { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  user_id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_creator: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: any | null;
  session: any | null;
  profile: UserProfile | null;
  loading: boolean;
  userRole: 'creator' | 'fan' | null;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  setUserRole: (role: 'creator' | 'fan') => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: false,
  userRole: null,
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
  setUserRole: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestRole, setGuestRole] = useState<'creator' | 'fan'>('fan');

  // Determine user role: from profile if logged in, or guest role if not
  const userRole: 'creator' | 'fan' | null = profile?.is_creator ? 'creator' : profile ? 'fan' : guestRole;

  useEffect(() => {
    // Check if there's a stored session and guest role
    const storedUser = localStorage.getItem('fanvault_auth_user');
    const storedProfile = localStorage.getItem('fanvault_auth_profile');
    const storedGuestRole = localStorage.getItem('fanvault_guest_role');
    
    if (storedUser && storedProfile) {
      const userData = JSON.parse(storedUser);
      const profileData = JSON.parse(storedProfile);
      
      setUser(userData);
      setProfile(profileData);
      setSession({ user: userData });
    }

    if (storedGuestRole) {
      setGuestRole(storedGuestRole as 'creator' | 'fan');
    }
    
    setLoading(false);
  }, []);

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);
      setProfile(null);
      
      // Clear localStorage
      localStorage.removeItem('fanvault_auth_user');
      localStorage.removeItem('fanvault_auth_profile');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const updatedProfile = { ...profile, ...updates } as UserProfile;
      setProfile(updatedProfile);
      
      // Update localStorage
      localStorage.setItem('fanvault_auth_profile', JSON.stringify(updatedProfile));
      
      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error };
    }
  };

  const setUserRole = (role: 'creator' | 'fan') => {
    if (profile) {
      // If logged in, update profile
      updateProfile({ ...profile, is_creator: role === 'creator' });
    } else {
      // If not logged in, update guest role
      setGuestRole(role);
      localStorage.setItem('fanvault_guest_role', role);
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    userRole,
    signOut,
    updateProfile,
    setUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
