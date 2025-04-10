import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, AlertCircle, Mail, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password.",
      });
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send reset email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout noFooter className="flex items-center justify-center min-h-screen bg-gradient-to-b from-muted/40 to-background">
      <div className="w-full max-w-md px-4">
        <Link 
          to="/admin/login" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to admin login
        </Link>

        <Card className="w-full border-2 shadow-lg">
          <CardHeader className="space-y-1 pb-2">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center font-bold">Admin Password Reset</CardTitle>
            <CardDescription className="text-center">
              Enter your admin email address to receive password reset instructions
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success ? (
                <Alert className="bg-green-50 border-green-200">
                  <Mail className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">
                    If an admin account exists with {email}, you will receive password reset instructions.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full h-11 font-medium" 
                disabled={isLoading || success}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : success ? (
                  'Email Sent'
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/admin/login')}
              >
                Return to Admin Login
              </Button>
            </CardFooter>
          </form>

          <div className="p-4 pt-0">
            <Separator className="my-4" />
            <div className="text-center text-xs text-muted-foreground">
              <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              {' '}&bull;{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminForgotPassword; 