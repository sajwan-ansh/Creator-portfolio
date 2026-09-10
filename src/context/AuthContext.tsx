import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, AuthCredentials, AuthResult } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => authService.getSession());

  const login = async (credentials: AuthCredentials): Promise<AuthResult> => {
    const result = await authService.login(credentials);
    if (result.success && result.session) {
      setUser(result.session);
    }
    return result;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
