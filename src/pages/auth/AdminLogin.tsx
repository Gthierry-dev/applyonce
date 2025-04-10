
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LockKeyhole, AlertCircle, UserPlus, ArrowLeft, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, resetPassword } = useAuth();
  
  // Redirect if already authenticated and is admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFullName, setSignupFullName] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // First check with the special admin login function
      const { data: checkResult, error: checkError } = await supabase.rpc('check_admin_login', {
        email,
        password
      });

      if (checkError) throw checkError;
      
      if (!checkResult) {
        throw new Error('Invalid credentials');
      }

      // If admin check passed, proceed with actual auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      // Verify if user has admin role in profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profileData.role !== 'admin') {
        // If not admin, sign out and show error
        await supabase.auth.signOut();
        throw new Error('You do not have administrator privileges');
      }

      toast({
        title: 'Admin Login Successful',
        description: 'Welcome to the admin dashboard.',
      });
      
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err instanceof Error ? err.message : 'Invalid credentials or server error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    
    try {
      await resetPassword(forgotEmail);
      setForgotEmail('');
      
      // Switch back to login tab after sending reset email
      document.getElementById('login-tab')?.click();
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setForgotLoading(false);
    }
  };

  const handleAdminSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    setSignupLoading(true);

    try {
      // Create the user account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: signupFullName,
            role: 'admin'
          }
        }
      });

      if (signUpError) throw signUpError;

      if (!data || !data.user) {
        throw new Error('Failed to create admin account');
      }

      // Manually update the role in profiles table to ensure admin status
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', data.user.id);

      if (updateError) throw updateError;

      toast({
        title: 'Admin Account Created',
        description: 'The new admin account has been created successfully.',
      });
      
      // Clear the form
      setSignupEmail('');
      setSignupPassword('');
      setSignupFullName('');
      
      // Switch to login tab
      document.getElementById('login-tab')?.click();
      
    } catch (err) {
      console.error('Admin signup error:', err);
      setSignupError(err instanceof Error ? err.message : 'An error occurred during signup');
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: err instanceof Error ? err.message : 'Failed to create admin account',
      });
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <Layout noFooter className="flex items-center justify-center px-4 h-screen bg-muted/40">
      <Link to="/" className="absolute top-4 left-4 flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary p-2">
              <LockKeyhole className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold">Admin Portal</CardTitle>
          <CardDescription className="text-center">
            Manage your application
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger id="login-tab" value="login">Login</TabsTrigger>
            <TabsTrigger value="forgot">Forgot Password</TabsTrigger>
            <TabsTrigger value="signup">Create Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleAdminLogin}>
              <CardContent className="space-y-4 pt-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
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
                    autoComplete="current-password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging In...' : 'Login to Admin'}
                </Button>
                <div className="w-full text-center text-sm text-muted-foreground">
                  <Link to="/" className="text-primary hover:underline">
                    Return to home page
                  </Link>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="forgot">
            <form onSubmit={handleForgotPassword}>
              <CardContent className="space-y-4 pt-4">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-muted p-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Enter your email and we'll send you instructions to reset your password
                </p>
                <div className="space-y-2">
                  <Label htmlFor="forgotEmail">Email</Label>
                  <Input 
                    id="forgotEmail" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={forgotLoading}>
                  {forgotLoading ? 'Sending...' : 'Reset Password'}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => document.getElementById('login-tab')?.click()}
                >
                  Back to Login
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleAdminSignup}>
              <CardContent className="space-y-4 pt-4">
                {signupError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{signupError}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="Jane Doe" 
                    value={signupFullName}
                    onChange={(e) => setSignupFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input 
                    id="signupEmail" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input 
                    id="signupPassword" 
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={signupLoading}>
                  {signupLoading ? (
                    'Creating Account...'
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Admin Account
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="p-4">
          <Separator className="my-2" />
          <div className="text-center text-xs text-muted-foreground mt-2">
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}&bull;{' '}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default AdminLogin;
