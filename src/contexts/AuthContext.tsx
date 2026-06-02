import React, { createContext, useContext } from 'react';

interface AuthContextType {
  logout: () => void;
  login: (role: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  logout: () => {},
  login: (_role: string) => {},
});

export const useAuth = () => useContext(AuthContext);