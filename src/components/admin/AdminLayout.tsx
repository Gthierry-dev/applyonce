
import React from 'react';
import Layout from '@/components/layout/Layout';
import Sidebar from '@/components/dashboard/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();

  return (
    <Layout noNavbar noFooter>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar isAdmin={true} />
        <div className={cn(
          'flex-1 overflow-auto h-screen', 
          isMobile && 'pt-16', 
          className
        )}>
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
   </Layout>
  );
};

export default AdminLayout;
