
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
        console.log('Opening profile section');
        break;
      case 'security':
        console.log('Opening security section');
        break;
      case 'about':
        console.log('Opening about section');
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="modern-card border-0 flex items-center gap-3 px-5 py-3 hover:bg-white/30">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="hidden sm:inline font-semibold text-foreground">Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 modern-card border border-white/30 shadow-2xl">
        <DropdownMenuLabel className="font-bold text-lg text-foreground py-3">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/30" />
        <DropdownMenuItem 
          onClick={() => handleMenuAction('profile')}
          className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer py-3 px-4 rounded-lg mx-2 my-1"
        >
          <User className="mr-3 h-5 w-5 text-primary" />
          <span className="font-medium">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleMenuAction('security')}
          className="hover:bg-accent/10 transition-colors duration-200 cursor-pointer py-3 px-4 rounded-lg mx-2 my-1"
        >
          <Shield className="mr-3 h-5 w-5 text-accent" />
          <span className="font-medium">Security</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleMenuAction('about')}
          className="hover:bg-blue-500/10 transition-colors duration-200 cursor-pointer py-3 px-4 rounded-lg mx-2 my-1"
        >
          <Info className="mr-3 h-5 w-5 text-blue-500" />
          <span className="font-medium">About</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/30 my-2" />
        <DropdownMenuItem 
          onClick={() => handleMenuAction('logout')} 
          className="text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer py-3 px-4 rounded-lg mx-2 my-1"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
