
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, Heart } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn("border-t bg-background", className)}>
      <Container>
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1.5">
                  <span className="text-primary-foreground font-bold text-sm">AO</span>
                </div>
                <span className="font-display font-semibold text-lg">ApplyOnce</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Streamline your application process. Apply once, unlock many opportunities.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/resources" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Resource Library
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/support" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing & Plans
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/about" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/community" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-4">Get Started</h4>
              <div className="space-y-3">
                <Link 
                  to="/signup" 
                  className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/80 h-9 px-4 py-2"
                >
                  Sign Up
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                <p className="text-xs text-muted-foreground">
                  Free plan includes up to 5 applications per month.
                </p>
                <Link
                  to="/admin/login"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-8"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ApplyOnce. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <span className="text-sm text-muted-foreground">
              Made with <Heart className="inline h-3 w-3 text-red-500" /> by Lovable
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
