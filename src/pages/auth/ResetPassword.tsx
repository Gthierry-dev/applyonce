
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, AlertCircle, KeyRound } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verify that we have a hash fragment with a reset token
    if (!window.location.hash.includes('type=recovery')) {
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description: "Please request a new password reset link."
      });
      navigate('/login', { replace: true });
    }
  }, [navigate, toast]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been successfully reset.",
      });
      
      setSuccess(true);
      
      // Clear form
      setPassword('');
      setConfirmPassword('');
      
      // Auto redirect after short delay
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during password reset');
      toast({
        variant: "destructive",
        title: "Password Reset Failed",
        description: err instanceof Error ? err.message : 'An error occurred during password reset',
      });
    } finally {
      setLoading(false);
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
              <div className="rounded-full bg-primary p-3">
                <KeyRound className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success ? (
              <Alert className="mb-4">
                <AlertDescription>Password reset successful! Redirecting to login...</AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : 'Reset Password'}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm mt-4">
              Remember your password?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Back to login
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

export default ResetPassword;
