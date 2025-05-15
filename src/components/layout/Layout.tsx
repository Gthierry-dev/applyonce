
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  noFooter?: boolean;
  noNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className, 
  noFooter = false,
  noNavbar = false
}) => {
  return (
      <div className="flex flex-col min-h-screen relative">
      {!noNavbar && <Navbar />}
      <main className={cn(
        'flex-1 w-full', 
        !noNavbar && 'pt-16',
        className
      )}>
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
