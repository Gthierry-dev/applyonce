import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  Folder,
  Users,
  Search,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  Menu,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isAdmin = false; // Replace with actual admin check

  const adminLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Forms', icon: <FileText size={20} />, path: '/admin/forms' },
    { name: 'Categories', icon: <Folder size={20} />, path: '/admin/categories' },
    { name: 'Users', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const userLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Applications', icon: <FileText size={20} />, path: '/applications' },
    { name: 'Categories', icon: <Folder size={20} />, path: '/categories' },
    { name: 'Application Status', icon: <ClipboardList size={20} />, path: '/application-status' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile menu when changing routes
  React.useEffect(() => {
    if (isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMobileToggle}
          className="fixed top-4 left-4 z-50"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </Button>

        {/* Mobile sidebar */}
        <div
          className={cn(
            'fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Backdrop */}
          <div
            className={cn(
              'absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity',
              mobileOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Sidebar content */}
          <nav className="relative w-64 h-full bg-sidebar text-sidebar-foreground p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1.5">
                  <span className="text-primary-foreground font-bold text-sm">A1</span>
                </div>
                <span className="font-display font-semibold text-lg text-sidebar-foreground">ApplyOnce</span>
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
              {links.map((link) => (
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
              <Link
                to="/"
                className="flex items-center px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                <span>Back to Home</span>
              </Link>
            </div>
          </nav>
        </div>
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
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1.5">
              <span className="text-primary-foreground font-bold text-sm">A1</span>
            </div>
            <span className="font-display font-semibold text-lg text-sidebar-foreground">ApplyOnce</span>
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
          {links.map((link) => {
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
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="flex items-center justify-center py-2 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                >
                  <LogOut size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Back to Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            to="/"
            className="flex items-center px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Back to Home</span>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
