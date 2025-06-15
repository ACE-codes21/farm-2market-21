
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavigationHeader: React.FC = () => {
  const navigationItems = [
    { name: 'Home', href: '#' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Programs', href: '#programs' },
    { name: 'Support', href: '#support' },
    { name: 'Careers', href: '#careers' },
    { name: 'Become a Partner', href: '#partner' },
  ];

  return (
    <>
      {/* Logo at top-left */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-2xl font-bold text-white font-sans">
          <span className="text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Farm</span>
          <span className="text-white">2Market</span>
        </h1>
      </div>

      {/* Navigation Menu */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-8 bg-white/10 backdrop-blur-md rounded-full px-8 py-3 border border-white/20">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  href={item.href}
                  className="text-white/90 hover:text-white font-medium text-sm transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10"
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Login/Register button at top-right */}
      <div className="absolute top-6 right-6 z-20">
        <Link to="/auth?mode=login">
          <Button 
            variant="outline"
            size="sm"
            className="text-white border border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/5 rounded-full px-6 font-medium"
          >
            Login/Register
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NavigationHeader;
