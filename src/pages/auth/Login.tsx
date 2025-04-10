
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, AlertCircle, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, resetPassword, user, isAdmin } = useAuth();
  
  // Extract redirect path from location state or use default
  const from = location.state?.from?.pathname || (isAdmin ? '/admin/dashboard' : '/dashboard');

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn(email, password);
      // No need to navigate here, the useEffect will handle it
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
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

  const handleSocialLogin = (provider: 'google' | 'linkedin') => {
    // Redirect to coming soon page
    navigate('/social-auth-coming-soon');
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
            <CardTitle className="text-2xl">Log in to ApplyOnce</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </CardHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mx-6">
              <TabsTrigger id="login-tab" value="login">Login</TabsTrigger>
              <TabsTrigger value="forgot">Forgot Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid grid-cols-2 gap-2">
                  <SocialLoginButton 
                    provider="google" 
                    onClick={() => handleSocialLogin('google')} 
                  />
                  <SocialLoginButton 
                    provider="linkedin" 
                    onClick={() => handleSocialLogin('linkedin')} 
                  />
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH EMAIL</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
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
            </TabsContent>
            
            <TabsContent value="forgot">
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-muted p-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Enter your email address and we'll send you a link to reset your password
                </p>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={forgotLoading}>
                    {forgotLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : 'Send Reset Link'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => document.getElementById('login-tab')?.click()}
                  >
                    Back to Login
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground mt-8">
          By continuing, you agree to ApplyOnce's{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <Link to="/admin/login" className="text-primary hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
