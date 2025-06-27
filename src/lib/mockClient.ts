
// Mock client to replace Supabase functionality
export const mockClient = {
  auth: {
    getUser: () => Promise.resolve({ 
      data: { 
        user: { 
          id: 'mock-user-id', 
          email: 'demo@example.com' 
        } 
      }, 
      error: null 
    }),
    getSession: () => Promise.resolve({ 
      data: { 
        session: { 
          user: { 
            id: 'mock-user-id', 
            email: 'demo@example.com' 
          } 
        } 
      }, 
      error: null 
    }),
    signUp: (data: any) => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: (data: any) => Promise.resolve({ 
      data: { 
        user: { 
          id: 'mock-user-id', 
          email: data.email 
        } 
      }, 
      error: null 
    }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: (callback: any) => {
      // Mock auth state change
      setTimeout(() => {
        callback('SIGNED_IN', {
          user: { id: 'mock-user-id', email: 'demo@example.com' }
        });
      }, 100);
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ 
          data: { 
            id: 'mock-id', 
            user_id: 'mock-user-id',
            username: 'demo_user',
            display_name: 'Demo User',
            bio: 'This is a demo profile',
            avatar_url: null,
            is_creator: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, 
          error: null 
        }),
        then: (callback: any) => callback({ 
          data: [{ 
            id: 'mock-id', 
            user_id: 'mock-user-id',
            username: 'demo_user',
            display_name: 'Demo User'
          }], 
          error: null 
        })
      })
    }),
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    })
  }),
  functions: {
    invoke: (name: string, options?: any) => Promise.resolve({ data: null, error: null })
  }
};
