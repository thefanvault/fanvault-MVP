
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
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: false,
  userRole: null,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
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

  const userRole: 'creator' | 'fan' | null = profile?.is_creator ? 'creator' : profile ? 'fan' : null;

  useEffect(() => {
    // Check if there's a stored session
    const storedUser = localStorage.getItem('fanvault_auth_user');
    const storedProfile = localStorage.getItem('fanvault_auth_profile');
    
    if (storedUser && storedProfile) {
      const userData = JSON.parse(storedUser);
      const profileData = JSON.parse(storedProfile);
      
      setUser(userData);
      setProfile(profileData);
      setSession({ user: userData });
    }
    
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, metadata: any = {}) => {
    try {
      console.log('Mock sign up:', email, metadata);
      
      const mockUser = {
        id: 'new-user-id',
        email: email
      };
      
      const mockProfile = {
        id: 'new-profile-id',
        user_id: 'new-user-id',
        username: email.split('@')[0],
        display_name: metadata.display_name || metadata.name || email.split('@')[0],
        bio: null,
        avatar_url: null,
        is_creator: metadata.isCreator || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(mockUser);
      setProfile(mockProfile);
      setSession({ user: mockUser });

      // Store in localStorage for persistence
      localStorage.setItem('fanvault_auth_user', JSON.stringify(mockUser));
      localStorage.setItem('fanvault_auth_profile', JSON.stringify(mockProfile));

      return { error: null };
    } catch (error) {
      console.error('Mock sign up error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Mock sign in:', email);
      
      const mockUser = {
        id: 'mock-user-id',
        email: email
      };

      const mockProfile = {
        id: 'mock-profile-id',
        user_id: 'mock-user-id',
        username: email.split('@')[0],
        display_name: email.split('@')[0],
        bio: 'This is a demo profile',
        avatar_url: null,
        is_creator: false, // Default to fan, can be changed in profile
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(mockUser);
      setProfile(mockProfile);
      setSession({ user: mockUser });

      // Store in localStorage for persistence
      localStorage.setItem('fanvault_auth_user', JSON.stringify(mockUser));
      localStorage.setItem('fanvault_auth_profile', JSON.stringify(mockProfile));
      
      return { error: null };
    } catch (error) {
      console.error('Mock sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);
      setProfile(null);
      
      // Clear localStorage
      localStorage.removeItem('fanvault_auth_user');
      localStorage.removeItem('fanvault_auth_profile');
    } catch (error) {
      console.error('Mock sign out error:', error);
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
      console.error('Mock update profile error:', error);
      return { error };
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    userRole,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
