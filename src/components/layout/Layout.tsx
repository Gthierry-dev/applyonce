
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  noFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className, noFooter = false }) => {
  return (
    <>
      <Navbar />
      <main className={cn('pt-16 min-h-[calc(100vh-64px)] flex flex-col', className)}>
        {children}
      </main>
      {!noFooter && <Footer />}
    </>
  );
};

export default Layout;
