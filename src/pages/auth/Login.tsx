
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulating authentication
      // In a real app, this would be replaced with an actual auth call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - we just move forward in this demo
      toast({
        title: "Login successful",
        description: "Welcome back to ApplyOnce!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'linkedin') => {
    toast({
      title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} login`,
      description: `This would connect to ${provider} in a real implementation.`,
    });
    // In a real app, this would trigger the OAuth flow
    navigate('/dashboard');
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
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
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm mt-4"> Continue as <Link to="/dashboard"  className="text-primary hover:underline"> Guest</Link></p>
            
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
      </div>
    </Layout>
  );
};

export default Login;
