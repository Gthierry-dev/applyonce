
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // For a real implementation, check if the user is logged in with Supabase auth
        // const { data: { session } } = await supabase.auth.getSession();
        
        // For now, we'll just check localStorage for a mock session
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');
        
        if (isLoggedIn && userEmail) {
          setUser({
            id: '1', // Mock ID
            email: userEmail,
            role: (userRole === 'admin' ? 'admin' : 'user') as 'admin' | 'user',
            name: 'Demo User'
          });
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For a real implementation with Supabase:
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email, password
      // });
      // if (error) throw error;
      
      // Mock login for demonstration
      if (email === 'user@example.com' && password === 'password') {
        setUser({
          id: '1', // Mock ID
          email: email,
          role: 'user',
          name: 'Demo User'
        });
        
        // Store in localStorage for persistence
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', 'user');
        
        toast({
          title: "Login successful",
          description: "Welcome to ApplyOnce!",
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Invalid login credentials');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For a real implementation, we would verify against the Supabase function:
      const { data, error } = await supabase.rpc('check_admin_login', {
        email,
        password
      });
      
      if (error) throw error;
      
      if (data === true) {
        setUser({
          id: '1', // Mock ID
          email: email,
          role: 'admin',
          name: 'Admin User'
        });
        
        // Store in localStorage for persistence
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        });
        
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Admin login failed",
        description: error.message || "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // For a real implementation:
      // await supabase.auth.signOut();
      
      // Clear localStorage for the mock implementation
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isAdminLoggedIn');
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Logout error",
        description: "An error occurred while logging out",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      // For a real implementation:
      // const { data, error } = await supabase.auth.signUp({
      //   email, password, options: { data: { full_name: name } }
      // });
      // if (error) throw error;
      
      // Mock signup
      setUser({
        id: '1', // Mock ID
        email: email,
        role: 'user',
        name: name
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', 'user');
      
      toast({
        title: "Signup successful",
        description: "Your account has been created!",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "An error occurred during signup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAdmin, 
      login, 
      adminLogin, 
      logout, 
      signup 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
