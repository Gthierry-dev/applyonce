
import React from 'react';
import Layout from '@/components/layout/Layout';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();

  return (
    
    // <Layout noFooter>
      <div className="flex h-full w-full">
        <Sidebar />
        <div className={cn(
          'flex-1 overflow-auto', 
          isMobile && 'pt-16', 
          className
        )}>
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    // </Layout>
  );
};

export default DashboardLayout;
