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
  HelpCircle,
  Puzzle,
  ChevronDown,
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
import { MdLocalFireDepartment } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import { Bounce, Fade, Hinge, JackInTheBox, Roll, Slide, Zoom } from "react-awesome-reveal";

interface SidebarProps {
  className?: string;
  isAdmin?: boolean;
  mobileOpen: any, 
  setMobileOpen: any
}

const Sidebar: React.FC<SidebarProps> = ({ className, isAdmin = false, mobileOpen, setMobileOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const [premiumCardClosed, setPremiumCardClosed] = useState<boolean>(() => {
    // Read initial state from localStorage
    const stored = localStorage.getItem("premiumCardClosed");
    return stored === "true";
  }); // New state for premium card
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Admin links remain the same
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

  // Restructured user links into categories
  const mainMenuLinks = [
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
    {
      name: "Application Status",
      icon: <TbClipboardList size={20} />,
      path: "/application-status",
    },
    {
      name: "Categories",
      icon: <TbFolder size={20} />,
      path: "/categories",
    },
  ];

  // Tools section - initially empty but structured for future additions
  const toolsLinks = [
    // Empty for now, will be populated later
    // Example structure:
    // { name: "Tool 1", icon: <Icon size={20} />, path: "/tool-1" },
  ];

  // Preferences section
  const preferencesLinks = [
    // Commented out Integrations page
    // {
    //   name: "Integrations",
    //   icon: <Puzzle size={20} />,
    //   path: "/integrations",
    // },
    {
      name: "Community",
      icon: <Users size={20} />,
      path: "/Communities",
    },
    {
      name: "Changelog",
      icon: <HelpCircle size={20} />,
      path: "/help",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  const links = isAdmin ? adminLinks : mainMenuLinks;
  const homeLink = isAdmin ? "/admin/dashboard" : "/dashboard";

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleToolsToggle = () => {
    setToolsExpanded(!toolsExpanded);
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Handle premium card close
  const handlePremiumCardClose = () => {
    setPremiumCardClosed(true);
    localStorage.setItem("premiumCardClosed", "true");
  };

  const handlePremiumCardOpen = () => {
    setPremiumCardClosed(false);
    localStorage.setItem("premiumCardClosed", "false");
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

  // Render a section of links with a title
  const renderLinkSection = (
    title,
    linksList,
    isCollapsible = false,
    isExpanded = false
  ) => {
    if (collapsed) {
      return (
        <div className="mb-4">
          {/* Remove the title  when collapsed */}
          <div className="space-y-1">
            {linksList.map((link) => (
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
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase text-gray-500 font-semibold px-3 mb-2">
            {title}
          </div>
          {isCollapsible && (
            <button
              onClick={handleToolsToggle}
              className="p-1 rounded-md hover:bg-gray-200 transition-colors"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
        {(!isCollapsible || isExpanded) && (
          <div className="space-y-1">
            {linksList.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-xl text-sm transition-colors font-medium",
                  location.pathname === link.path
                    ? "bg-main_color/10 text-main_color ring-1 ring-main_color/15"
                    : "text-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMobileToggle}
          className="fixed top-4 left-4 z-40"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </Button>

        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed  inset-0 z-40 transform transition-transform duration-300 ease-in-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0 bg-[#f9f9fb] w-64 backdrop-blur-sm transition-opacity",
              mobileOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Sidebar content */}
          <nav className="relative w-64 h-full bg-sidebar  text-sidebar-foreground p-4 flex flex-col overflow-y-auto border-r border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <Link to={homeLink} className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1.5">
                  <span className="text-primary-foreground font-bold text-sm">
                    <img src="./2.png" alt="" className="w-5" />
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
                className="text-sidebar-foreground hover:text-main_color hover:bg-main_color/10"
              >
                <ChevronLeft size={20} />
              </Button>
            </div>

            {isAdmin ? (
              <div className="space-y-1">
                {adminLinks.map((link) => (
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
            ) : (
              <>
                <div className="flex-grow">
                  {renderLinkSection("MAIN MENU", mainMenuLinks)}
                  {renderLinkSection("TOOLS", toolsLinks, true, toolsExpanded)}
                </div>

                {/* Preferences section moved to bottom */}
                <div className="mt-auto mb-2">
                  {renderLinkSection("PREFERENCES", preferencesLinks)}
                </div>

                <div className="mt-auto">
                  {/* Premium card and logout button */}
                  {/* ... existing code ... */}
                </div>
              </>
            )}
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

      <div className="flex-1 pt-3 overflow-y-auto">
        <nav className="px-3 space-y-1 flex flex-col h-full">
          {isAdmin ? (
            links.map((link) => {
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
                    "flex items-center px-3 py-2 rounded-xl text-sm transition-colors font-medium",
                    location.pathname === link.path
                      ? "bg-main_color/10 text-main_color ring-1 ring-main_color/15"
                      : "text-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })
          ) : (
            <>
              <div className="flex-grow">
                {renderLinkSection("MAIN MENU", mainMenuLinks)}
                {renderLinkSection("TOOLS", toolsLinks, true, toolsExpanded)}
              </div>

              {/* Preferences section moved to bottom */}
              <div className="mt-auto">
                {renderLinkSection("PREFERENCES", preferencesLinks)}
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Premium Card Section */}
      {collapsed ? (
        // Collapsed state - show just the number in a green card
        <div className="px-3 pb-3">
          <div className="flex justify-center">
            <div className="p-2 bg-gradient-to-b from-[#3f8582] to-main_color text-white rounded-lg">
              <span className="text-sm font-semibold">30</span>
            </div>
          </div>
        </div>
      ) : (
        // Expanded state - show either full card or just the days indicator
        <div className="w-full h-fit px-3 pb-3">
          {premiumCardClosed ? (
            // Closed state - show just the days indicator at the bottom
            <Fade duration={350} triggerOnce={true}>
              <div
                onClick={handlePremiumCardOpen}
                className={`flex items-center justify-center gap-2 bg-gradient-to-b from-[#3f8582] to-main_color text-white/90 rounded-xl px-3 py-2.5 w-fit mx-auto transition-transform active:scale-[.98] cursor-pointer select-none ${
                  premiumCardClosed ? "w-full" : "w-fit"
                }`}
              >
                <MdLocalFireDepartment className="text-xl text-white" />
                <span className="text-sm font-semibold">30 days left</span>
              </div>
            </Fade>
          ) : (
            // Open state - show full premium card
            <Fade duration={350} triggerOnce={true}>
              <div className="mb-0 p-3 bg-white rounded-xl shadow-sm border border-stone-200/60">
                <div className="flex justify-between items-start">
                  <div
                    className={`flex items-center gap-2 bg-gradient-to-b from-[#3f8582] to-main_color text-white/90 rounded-xl px-3 py-2 mb-2`}
                  >
                    <MdLocalFireDepartment className="text-xl text-white" />
                    <span className="text-sm font-semibold">30 days left</span>
                  </div>
                  <button
                    className="p-1 flex items-top text-foreground"
                    onClick={handlePremiumCardClose}
                  >
                    <RiCloseLargeFill className="text-foreground" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Upgrade to premium and enjoy the benefits for a long time
                </p>
                <button className="w-full py-2 text-center bg-[#f9f9fb] hover:bg-[#f0f0f0] border border-stone-200 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground/90 transition-colors">
                  View plan
                </button>
              </div>
            </Fade>
          )}
        </div>
      )}

      <div>{/* Commented out logout button */}</div>
    </aside>
  );
};

export default Sidebar;
