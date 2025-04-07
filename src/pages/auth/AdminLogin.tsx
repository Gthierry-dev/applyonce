
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Call our custom admin login function
      const { data, error } = await supabase.rpc('check_admin_login', {
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data === true) {
        // Login successful
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        });
        
        // For simplicity, we're just storing a flag in localStorage
        // In a real app, you'd use a proper auth system with tokens
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        
        navigate('/admin/dashboard');
      } else {
        // Login failed
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout noFooter className="bg-background">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col justify-center py-12 px-4">
        <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        
        <Card className="w-full animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <div className="rounded-md bg-primary p-2">
                <span className="text-primary-foreground font-bold text-sm">A1</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your credentials to access the admin dashboard
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : 'Log in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-muted-foreground mt-4">
              <span className="block text-xs">For demo purposes use:</span>
              <span className="block text-xs font-medium">Email: admin@example.com</span>
              <span className="block text-xs font-medium">Password: admin</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
