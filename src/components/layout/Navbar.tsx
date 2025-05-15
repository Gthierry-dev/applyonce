import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, BellRing, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categoryData, iconMap } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import OpportunitiesDropdown from './OpportunitiesDropdown';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isAuthenticated = false; // Replace with actual auth state

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    // Opportunities is handled separately as a dropdown
    { name: 'Community', path: '/community' },
    { name: 'Resources', path: '/resources' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background border-b' : 'bg-[unset]'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              {/* <div className="rounded-md bg-main_color p-1.5">
                <span className="text-main_color-foreground font-bold text-sm">AO</span>
              </div> */}
              <div className='w-fit h-7 min-w-7'>
                <img src="./favicon.png" alt="" className='h-full' />
              </div>
              <span className="font-display font-semibold text-lg">ApplyOnce</span>
            </Link>
          </div>

          {/* Desktop nav items */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home link */}
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className={cn(
                      'px-3 h-11 flex items-center justify-center rounded-xl text-sm font-medium transition-colors',
                      location.pathname === "/"
                        ? 'text-main_color'
                        : 'text-foreground hover:bg-accent'
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* Opportunities dropdown */}
                <NavigationMenuItem className="static">
                  <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-accent">Opportunities</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-screen">
                    <OpportunitiesDropdown />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other nav items */}
                {navItems.slice(1).map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        'px-3 h-11 flex items-center justify-center rounded-xl text-sm font-medium transition-colors',
                        location.pathname === item.path
                          ? 'text-main_color'
                          : 'text-foreground hover:bg-accent'
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="transition-all">
                        <Search className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="transition-all">
                        <BellRing className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Link to="/profile">
                  <div className="h-8 w-8 rounded-full bg-main_color/10 flex items-center justify-center text-main_color font-medium">
                    U
                  </div>
                </Link>
              </>
            ) : (
              <>
                {!isMobile && (
                  <Link to="/login">
                    <Button variant="ghost">Log in</Button>
                  </Link>
                )}
                <Link to="/signup" className=''>
                  <Button variant="default" className="shadow-sm rounded-xl text-white bg-main_color hover:brightness-90">Get Started</Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center text-main_color">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animated-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md shadow-lg border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                  location.pathname === item.path
                    ? 'text-main_color bg-main_color/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Opportunities submenu */}
            <div className="px-3 py-2">
              <div className="font-medium mb-1">Opportunities</div>
              <div className="pl-3 space-y-1 border-l border-border">
                {categoryData.slice(0, 5).map((category) => (
                  <Link
                    key={category.title}
                    to={`/opportunities?category=${encodeURIComponent(category.title)}`}
                    className="block px-3 py-1.5 rounded-md text-sm transition-colors text-foreground/70 hover:text-foreground hover:bg-accent"
                  >
                    {category.title}
                  </Link>
                ))}
                <Link
                  to="/opportunities"
                  className="block px-3 py-1.5 rounded-md text-sm font-medium text-main_color hover:bg-accent"
                >
                  View all →
                </Link>
              </div>
            </div>
            
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-foreground hover:bg-accent"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
