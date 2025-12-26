import React, { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'staff';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, name: string, role?: 'user' | 'staff') => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock sign in
  const signIn = async (email: string, name: string, role: 'user' | 'staff' = 'user') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({
      id: role === 'staff' ? 'staff-1' : '1',
      name: name,
      email: email,
      phone: '071 234 5678',
      role: role
    });
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
