// src/contexts/QueueContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

interface Token {
  number: string;
  status: 'waiting' | 'now-serving' | 'completed' | 'cancelled';
  department: string;
  ahead: number;
}

interface QueueContextType {
  currentToken: string | null;
  userToken: Token | null;
  estimatedTime: number;
  generateToken: (department: string) => Promise<void>;
  callNextToken: () => Promise<void>;
  cancelToken: (tokenId: string) => Promise<void>;
  pauseQueue: () => Promise<void>;
  resumeQueue: () => Promise<void>;
}

export const QueueContext = createContext<QueueContextType>({} as QueueContextType);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentToken, setCurrentToken] = useState<string | null>('A-12');
  const [userToken, setUserToken] = useState<Token | null>(null);
  const [estimatedTime, setEstimatedTime] = useState(0);

  const generateToken = async (department: string) => {
    // API call to generate token
    const newToken = {
      number: 'A-20',
      status: 'waiting' as const,
      department,
      ahead: 8,
    };
    setUserToken(newToken);
    setEstimatedTime(16);
  };

  const callNextToken = async () => {
    // API call to call next token
    setCurrentToken('A-13');
  };

  const cancelToken = async (tokenId: string) => {
    // API call to cancel token
    console.log('Cancel token:', tokenId);
  };

  const pauseQueue = async () => {
    // API call to pause queue
    Alert.alert('Queue Paused', 'New tokens will not be accepted');
  };

  const resumeQueue = async () => {
    // API call to resume queue
    Alert.alert('Queue Resumed', 'New tokens are now being accepted');
  };

  return (
    <QueueContext.Provider
      value={{
        currentToken,
        userToken,
        estimatedTime,
        generateToken,
        callNextToken,
        cancelToken,
        pauseQueue,
        resumeQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};