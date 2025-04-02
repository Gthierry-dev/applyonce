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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg',
        scrolled ? 'bg-background/80 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1.5">
                <span className="text-primary-foreground font-bold text-sm">AO</span>
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
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      location.pathname === "/"
                        ? 'text-primary'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* Opportunities dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Opportunities</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      {categoryData.map((category) => {
                        const IconComponent = iconMap[category.iconName];
                        return (
                          <Link
                            key={category.title}
                            to={`/opportunities?category=${encodeURIComponent(category.title)}`}
                            className="flex items-start gap-2 p-2 rounded-md hover:bg-accent"
                          >
                            <div className={`p-1.5 rounded-md ${category.color}`}>
                              <IconComponent className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{category.title}</div>
                              <p className="text-xs text-muted-foreground">{category.description}</p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {category.count}
                              </Badge>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other nav items */}
                {navItems.slice(1).map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        location.pathname === item.path
                          ? 'text-primary'
                          : 'text-foreground/70 hover:text-foreground hover:bg-accent'
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
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
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
                <Link to="/signup">
                  <Button variant="default" className="shadow-sm">Get Started</Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
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
                    ? 'text-primary bg-primary/10'
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
                  className="block px-3 py-1.5 rounded-md text-sm font-medium text-primary hover:bg-accent"
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
    </header>
  );
};

export default Navbar;
