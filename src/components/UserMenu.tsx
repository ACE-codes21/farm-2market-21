
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, Shield, Info, LogOut } from 'lucide-react';

interface UserMenuProps {
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onLogout }) => {
  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'logout':
        onLogout();
        break;
      case 'profile':
        // TODO: Implement profile/me section
        console.log('Opening profile section');
        break;
      case 'security':
        // TODO: Implement security section
        console.log('Opening security section');
        break;
      case 'about':
        // TODO: Implement about section
        console.log('Opening about section');
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-primary/10 transition-all duration-200 rounded-full px-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="hidden sm:inline font-medium">Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-border/50 shadow-lg">
        <DropdownMenuLabel className="font-semibold text-foreground">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem 
          onClick={() => handleMenuAction('profile')}
          className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
        >
          <User className="mr-3 h-4 w-4 text-primary" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleMenuAction('security')}
          className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
        >
          <Shield className="mr-3 h-4 w-4 text-accent" />
          <span>Security</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleMenuAction('about')}
          className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
        >
          <Info className="mr-3 h-4 w-4 text-blue-500" />
          <span>About</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem 
          onClick={() => handleMenuAction('logout')} 
          className="text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
