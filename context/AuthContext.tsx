// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

interface AuthProps {
  authState: { authenticated: boolean | null; username: string | null; role: Role | null };
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
    username: string | null;
    role: Role | null;
  }>({
    authenticated: null,
    username: null,
    role: null,
  });

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setAuthState({
        authenticated: true,
        username: username,       role: Role.ADMIN,
      });
      console.log('Logged in as Admin:', { authenticated: true, role: Role.ADMIN });
    } else if (username === 'user' && password === 'user') {
      setAuthState({
        authenticated: true,
        username: username,
        role: Role.USER,
      });
      console.log('Logged in as User:', { authenticated: true, role: Role.USER });
    } else {
      alert('Invalid username or password!');
    }
  };

  const logout = () => {
    setAuthState({
      authenticated: false,
      username: null,
      role: null,
    });
    console.log('Logged out:', { authenticated: false, role: null });
  };

  const value: AuthProps = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
