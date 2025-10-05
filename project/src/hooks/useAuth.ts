import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In a real app, verify token with backend
          const mockUser: User = {
            id: '1',
            email: 'demo@codelearn.com',
            firstName: 'Demo',
            lastName: 'User',
            username: 'demouser',
            totalPoints: 245,
            currentBadge: {
              id: 'bronze',
              name: 'Bronze Explorer',
              description: 'Completed your first lessons and started your coding journey',
              pointsRequired: 100,
              color: '#CD7F32',
              icon: 'Award'
            },
            joinedAt: '2024-01-10T10:00:00Z',
            lastActive: new Date().toISOString(),
            completedLessons: ['intro-algorithms'],
            completedQuizzes: ['intro-algorithms-quiz']
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - in real app, call backend API
      if (email === 'demo@codelearn.com' && password === 'demo123') {
        const mockUser: User = {
          id: '1',
          email: 'demo@codelearn.com',
          firstName: 'Demo',
          lastName: 'User',
          username: 'demouser',
          totalPoints: 245,
          currentBadge: {
            id: 'bronze',
            name: 'Bronze Explorer',
            description: 'Completed your first lessons and started your coding journey',
            pointsRequired: 100,
            color: '#CD7F32',
            icon: 'Award'
          },
          joinedAt: '2024-01-10T10:00:00Z',
          lastActive: new Date().toISOString(),
          completedLessons: ['intro-algorithms'],
          completedQuizzes: ['intro-algorithms-quiz']
        };
        
        localStorage.setItem('auth_token', 'mock-token');
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Mock registration - in real app, call backend API
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        totalPoints: 0,
        currentBadge: {
          id: 'bronze',
          name: 'Bronze Explorer',
          description: 'Completed your first lessons and started your coding journey',
          pointsRequired: 100,
          color: '#CD7F32',
          icon: 'Award'
        },
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        completedLessons: [],
        completedQuizzes: []
      };
      
      localStorage.setItem('auth_token', 'mock-token');
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return {
    user,
    login,
    register,
    logout,
    loading
  };
};

export { AuthContext };