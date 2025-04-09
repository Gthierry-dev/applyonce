
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, ShieldAlert } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing admin session
  useEffect(() => {
    const checkAdminSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user is admin
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (!error && data?.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        }
      }
    };
    
    checkAdminSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        // Check if user is an admin
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) throw profileError;
        
        if (profileData?.role === 'admin') {
          toast({
            title: "Admin Login Successful",
            description: "Welcome to the admin dashboard!",
          });
          navigate('/admin/dashboard', { replace: true });
        } else {
          // Not an admin, sign them out
          await supabase.auth.signOut();
          throw new Error("You do not have admin privileges.");
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Admin Login Failed",
        description: error.message || "Invalid admin credentials",
      });
      console.error('Admin login error:', error);
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
        
        <Card className="w-full animate-scale-in border-amber-500">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <div className="rounded-md bg-amber-500 p-2">
                <ShieldAlert className="h-5 w-5 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Access the admin dashboard with your admin credentials
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : 'Admin Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm mt-4">
              Not an admin?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Regular Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
