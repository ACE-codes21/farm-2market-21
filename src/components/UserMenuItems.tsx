
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  User as UserIcon, 
  Settings, 
  Shield, 
  Info, 
  LogOut, 
  Heart,
  CreditCard,
  HelpCircle,
  Bell
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';

interface UserMenuItemsProps {
  user: User;
  displayName: string;
}

export const UserMenuItems: React.FC<UserMenuItemsProps> = ({ user, displayName }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to logout. Please try again.",
          variant: "destructive",
        });
        return;
      }

      localStorage.removeItem('userSession');
      
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });

      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during logout.",
        variant: "destructive",
      });
    }
  };

  const handleMenuAction = (action: string) => {
    const actions: { [key: string]: string } = {
        profile: "Profile",
        settings: "Settings",
        security: "Security",
        billing: "Billing",
        notifications: "Notifications",
        favorites: "Favorites",
        help: "Help",
        about: "About",
    };

    if (actions[action]) {
        toast({
            title: actions[action],
            description: `${actions[action]} section coming soon!`,
        });
    }
  };

  return (
    <DropdownMenuContent 
      align="end" 
      className="w-64 bg-white border border-gray-200 shadow-lg z-50"
    >
      <DropdownMenuLabel className="font-bold text-lg py-3">
        Welcome, {displayName}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      <DropdownMenuItem onClick={() => handleMenuAction('profile')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <UserIcon className="mr-3 h-4 w-4 text-gray-600" />
        <span>Profile</span>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => handleMenuAction('favorites')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <Heart className="mr-3 h-4 w-4 text-red-500" />
        <span>Favorites</span>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => handleMenuAction('notifications')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <Bell className="mr-3 h-4 w-4 text-yellow-500" />
        <span>Notifications</span>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem onClick={() => handleMenuAction('settings')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <Settings className="mr-3 h-4 w-4 text-gray-600" />
        <span>Settings</span>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => handleMenuAction('security')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <Shield className="mr-3 h-4 w-4 text-blue-500" />
        <span>Security</span>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => handleMenuAction('billing')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <CreditCard className="mr-3 h-4 w-4 text-green-500" />
        <span>Billing</span>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem onClick={() => handleMenuAction('help')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <HelpCircle className="mr-3 h-4 w-4 text-purple-500" />
        <span>Help & Support</span>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => handleMenuAction('about')} className="hover:bg-gray-100 cursor-pointer py-3 px-4">
        <Info className="mr-3 h-4 w-4 text-blue-500" />
        <span>About</span>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 cursor-pointer py-3 px-4">
        <LogOut className="mr-3 h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
