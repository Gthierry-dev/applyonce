import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  ClipboardList,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { TbSmartHome } from "react-icons/tb";
import { TbSearch } from "react-icons/tb";
import { TbClipboardList } from "react-icons/tb";
import { TbFolder } from "react-icons/tb";

interface SidebarProps {
  className?: string;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isAdmin = false }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const adminLinks = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Opportunities",
      icon: <FileText size={20} />,
      path: "/admin/opportunities",
    },
    {
      name: "Categories",
      icon: <Folder size={20} />,
      path: "/admin/categories",
    },
    { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
    {
      name: "Analytics",
      icon: <BarChart size={20} />,
      path: "/admin/analytics",
    },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  const userLinks = [
    {
      name: "Dashboard",
      icon: <TbSmartHome size={20} />,
      path: "/dashboard",
    },
    {
      name: "Opportunities",
      icon: <TbSearch size={20} />,
      path: "/opportunities",
    },
    // { name: 'Applications', icon: <FileText size={20} />, path: '/applications' },
    {
      name: "Application Status",
      icon: <TbClipboardList size={20} />,
      path: "/application-status",
    },
    { name: "Categories", icon: <TbFolder size={20} />, path: "/categories" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const links = isAdmin ? adminLinks : userLinks;
  const homeLink = isAdmin ? "/admin/dashboard" : "/dashboard";

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

  // Determine if we're in the admin section
  useEffect(() => {
    const isCurrentlyAdmin = location.pathname.startsWith("/admin");
    if (isAdmin !== isCurrentlyAdmin && location.pathname !== "/") {
      // This is a prop-based check, you might want to handle this differently
      // in a real implementation with authentication
    }
  }, [location.pathname, isAdmin]);

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
            "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity",
              mobileOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Sidebar content */}
          <nav className="relative w-64 h-full bg-sidebar text-sidebar-foreground p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Link to={homeLink} className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1.5">
                  <span className="text-primary-foreground font-bold text-sm">
                    A1
                  </span>
                </div>
                <span className="font-display font-semibold text-lg text-sidebar-foreground">
                  {isAdmin ? "Admin Panel" : "ApplyOnce"}
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
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                    location.pathname === link.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
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
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col transition-all duration-300 bg-[#f9f9fb] border-r-[2px] border-stone-200/60 group",
        collapsed ? "w-[70px]" : "w-64",
        className
      )}
    >
      <div className="p-4 flex items-center justify-between relative border-b-[2px] border-stone-200/60">
        {!collapsed && (
          <Link to={homeLink} className="flex items-center gap-2">
            <div className="w-fit h-7 min-w-7">
              <img src="./favicon.png" alt="" className="h-full" />
            </div>
            <span className="font-display font-semibold text-lg text-sidebar-foreground">
              {isAdmin ? "Admin Panel" : "ApplyOnce"}
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto">
            <div className="w-fit h-7 min-w-7">
              <img src="./favicon.png" alt="" className="h-full" />
            </div>
          </div>
        )}
        {!collapsed && (
          <button
            onClick={handleToggleCollapse}
            className="size-10 flex items-center justify-center rounded-xl text-sidebar-foreground hover:bg-foreground/5"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={handleToggleCollapse}
            className="size-7 flex items-center justify-center rounded-lg text-sidebar-foreground transition-all opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 bg-white border border-[#e7e7e7] absolute -right-[14px] z-10"
          >
            <ChevronRight size={18} />
          </button>
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
                          "flex items-center justify-center py-2 rounded-md transition-colors",
                          location.pathname === link.path
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
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
                  "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === link.path
                    ? "bg-red-400 text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
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
        {/* {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleLogout}
                  className="flex items-center justify-center py-2 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                >
                  <LogOut size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm text-white hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </Button>
        )} */}

<div className="mb-3 p-4 bg-white rounded-xl shadow-sm border border-stone-200/60"> 
    <div className="flex justify-between align-center">
    <div className="flex items-center gap-2 bg-black text-white rounded-xl px-3 py-1.5 mb-2 w-fit"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
    <span className="text-sm font-medium">20 days left</span> 
  </div>
  <button className=" flex py-2 items-top text-black">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    </div>
  <p className="text-sm text-gray-600 mb-3">Upgrade to premium and enjoy the benefits for a long time</p>
  <button className="w-full py-2 text-center bg-white hover:bg-[#306C6A] hover:text-white  border border-stone-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
    View plan
  </button>
</div>
      </div>
    </aside>
  );
};

export default Sidebar;
