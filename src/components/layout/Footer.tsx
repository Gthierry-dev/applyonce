
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight, Mails } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1.5">
                <span className="text-primary-foreground font-bold text-sm">A1</span>
              </div>
              <span className="font-display font-semibold text-lg">ApplyOnce</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Streamlining the application process for opportunities across
              educational, professional, and personal development sectors.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/opportunities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Find Opportunities
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Subscribe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest opportunities and news.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none">
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} ApplyOnce. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <a href="mailto:support@applyonce.com" className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Mails size={14} className="mr-1" />
              support@applyonce.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
