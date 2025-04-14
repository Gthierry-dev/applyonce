import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';
import Sidebar from './Sidebar';

interface CompanyLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={cn(
        'flex-1 overflow-auto h-screen', 
        isMobile && 'pt-16', 
        className
      )}>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default CompanyLayout; 