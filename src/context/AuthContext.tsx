import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types/ideathon';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  signup: (data: Omit<UserProfile, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUserTeam: (teamId?: string) => void;
}

const DEMO_USERS: Record<UserRole, UserProfile> = {
  participant: {
    id: 'user_part_01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@mits.ac.in',
    role: 'participant',
    college: 'Madanapalle Institute of Technology & Science',
    department: 'Electronics & Communication Engineering (ECE)',
    phone: '9876543210',
    teamId: 'team_01',
    createdAt: '2026-10-15T10:00:00Z',
  },
  admin: {
    id: 'user_admin_01',
    name: 'Dr. Ramesh Kumar (Admin)',
    email: 'admin.ideavya@mits.ac.in',
    role: 'admin',
    college: 'MITS Deemed to be University',
    department: 'Innovation & Incubation Cell',
    phone: '9123456780',
    createdAt: '2026-10-01T09:00:00Z',
  },
  judge: {
    id: 'user_judge_01',
    name: 'Priya Iyer (Judge / Mentor)',
    email: 'priya.eval@pathvision.io',
    role: 'judge',
    college: 'Pathvision Innovations Ltd.',
    department: 'Applied AI & Autonomous Systems',
    phone: '9988776655',
    createdAt: '2026-10-10T11:00:00Z',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ideavya_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to demo participant
    }
    return DEMO_USERS.participant;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [user]);

  const login = async (email: string, role: UserRole = 'participant'): Promise<boolean> => {
    const demo = DEMO_USERS[role];
    const loggedUser: UserProfile = {
      ...demo,
      email: email || demo.email,
    };
    setUser(loggedUser);
    return true;
  };

  const signup = async (data: Omit<UserProfile, 'id' | 'createdAt'>): Promise<boolean> => {
    const newUser: UserProfile = {
      ...data,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(DEMO_USERS[role]);
  };

  const updateUserTeam = (teamId?: string) => {
    setUser(prev => prev ? { ...prev, teamId } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        switchRole,
        updateUserTeam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
