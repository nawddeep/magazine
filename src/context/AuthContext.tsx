import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isSubscribed: boolean;
  subscribe: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Admin credentials (in production, this would be server-side)
const ADMIN_CREDENTIALS = {
  email: 'admin@vanguard.editorial',
  password: 'admin123'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('vanguard_auth') === 'true';
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('vanguard_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return localStorage.getItem('vanguard_subscribed') === 'true';
  });

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    localStorage.setItem('vanguard_auth', String(isAuthenticated));
    if (user) {
      localStorage.setItem('vanguard_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vanguard_user');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    localStorage.setItem('vanguard_subscribed', String(isSubscribed));
  }, [isSubscribed]);

  // Regular user login (for magazine subscription features)
  const login = async (email: string, password: string) => {
    // Mock authentication: accept any non‑empty credentials
    const success = email.trim().length > 0 && password.trim().length > 0;
    if (success) {
      setIsAuthenticated(true);
      setUser({ email, role: 'user' });
    }
    return success;
  };

  // Admin login with credential validation
  const adminLogin = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUser({ email: ADMIN_CREDENTIALS.email, role: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('vanguard_auth');
    localStorage.removeItem('vanguard_user');
  };

  const subscribe = () => setIsSubscribed(true);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAdmin,
      user,
      login, 
      adminLogin,
      logout, 
      isSubscribed, 
      subscribe 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
