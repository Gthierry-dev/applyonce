import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  FileText,
  Folder,
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const companyLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/company/dashboard' },
    { name: 'Applications', icon: <FileText size={20} />, path: '/company/applications' },
    { name: 'Categories', icon: <Folder size={20} />, path: '/company/categories' },
    { name: 'Profile', icon: <Users size={20} />, path: '/company/profile' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/company/settings' },
  ];

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    if (isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMobileToggle}
          className="fixed top-4 left-4 z-50"
        >
          <ChevronRight size={20} />
        </Button>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground">
              <nav className="relative w-64 h-full bg-sidebar text-sidebar-foreground p-4 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/company/dashboard" className="flex items-center gap-2">
                    <div className="rounded-md bg-primary p-1.5">
                      <span className="text-primary-foreground font-bold text-sm">A1</span>
                    </div>
                    <span className="font-display font-semibold text-lg text-sidebar-foreground">
                      Company Panel
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
                  >
                    <ChevronLeft size={20} />
                  </Button>
                </div>

                <div className="space-y-1">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-md text-sm transition-colors',
                        location.pathname === link.path
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                      )}
                    >
                      <span className="mr-3">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                  >
                    <LogOut size={20} className="mr-3" />
                    <span>Logout</span>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      className={cn(
        'h-screen sticky top-0 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-y-auto',
        collapsed ? 'w-[70px]' : 'w-64',
        className
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <Link to="/company/dashboard" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1.5">
              <span className="text-primary-foreground font-bold text-sm">A1</span>
            </div>
            <span className="font-display font-semibold text-lg text-sidebar-foreground">
              Company Panel
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto">
            <div className="rounded-md bg-primary p-1.5">
              <span className="text-primary-foreground font-bold text-sm">A1</span>
            </div>
          </div>
        )}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
          >
            <ChevronLeft size={18} />
          </Button>
        )}
        {collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="w-full text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
          >
            <ChevronRight size={18} />
          </Button>
        )}
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {companyLinks.map((link) => {
            if (collapsed) {
              return (
                <TooltipProvider key={link.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={link.path}
                        className={cn(
                          'flex items-center justify-center py-2 rounded-md transition-colors',
                          location.pathname === link.path
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                        )}
                      >
                        {link.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{link.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm transition-colors',
                  location.pathname === link.path
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <Button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar; 