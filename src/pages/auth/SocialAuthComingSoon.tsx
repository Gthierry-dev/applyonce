
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const SocialAuthComingSoon = () => {
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
            <CardTitle className="text-2xl">Social Login Coming Soon!</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              We're working on integrating social login options for a better experience.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="py-6">
              Social login with Google and LinkedIn will be available soon. In the meantime, please use email and password login.
            </p>
            
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link to="/login">Go to Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SocialAuthComingSoon;
