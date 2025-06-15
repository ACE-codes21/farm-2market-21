
import React, { useState } from 'react';
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
  Bell,
  MapPin
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { VendorProfileModal } from './vendor/VendorProfileModal';
import { useUserSession } from '@/hooks/useUserSession';
import type { User } from '@supabase/supabase-js';

interface UserMenuItemsProps {
  user: User;
  displayName: string;
}

export const UserMenuItems: React.FC<UserMenuItemsProps> = ({ user, displayName }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const currentUser = useUserSession();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Clear localStorage first
      localStorage.removeItem('userSession');
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase sign out error:', error.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to logout properly.",
        });
        return;
      }

      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });

      // Force navigation after successful logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during logout.",
      });
    }
  };

  const handleProfileClick = () => {
    // Check if user is a vendor
    const userRole = user.user_metadata?.role || localStorage.getItem('userSession') && JSON.parse(localStorage.getItem('userSession')!).role;
    
    if (userRole === 'vendor') {
      setIsProfileModalOpen(true);
    } else {
      toast({
        title: "Profile",
        description: "Profile section coming soon!",
      });
    }
  };

  const handleMenuAction = (action: string) => {
    const actions: { [key: string]: string } = {
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

  // Check if user is a vendor
  const userRole = user.user_metadata?.role || (localStorage.getItem('userSession') && JSON.parse(localStorage.getItem('userSession')!).role);
  const isVendor = userRole === 'vendor';

  return (
    <>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-slate-800/95 border border-slate-600/50 shadow-xl backdrop-blur-md z-50"
      >
        <DropdownMenuLabel className="font-bold text-lg py-3 text-white border-b border-slate-600/30">
          Welcome, {displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-600/30" />
        
        <DropdownMenuItem onClick={handleProfileClick} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <UserIcon className="mr-3 h-4 w-4 text-slate-300" />
          <span>Profile</span>
          {isVendor && <MapPin className="ml-auto h-4 w-4 text-green-400" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleMenuAction('favorites')} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <Heart className="mr-3 h-4 w-4 text-red-400" />
          <span>Favorites</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleMenuAction('notifications')} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <Bell className="mr-3 h-4 w-4 text-yellow-400" />
          <span>Notifications</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-slate-600/30" />
        
        <DropdownMenuItem onClick={() => handleMenuAction('settings')} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <Settings className="mr-3 h-4 w-4 text-slate-300" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleMenuAction('security')} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <Shield className="mr-3 h-4 w-4 text-blue-400" />
          <span>Security</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleMenuAction('billing')} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <CreditCard className="mr-3 h-4 w-4 text-green-400" />
          <span>Billing</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-slate-600/30" />
        
        <DropdownMenuItem onClick={() => handleMenuAction('help')} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <HelpCircle className="mr-3 h-4 w-4 text-purple-400" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleMenuAction('about')} className="hover:bg-slate-700/50 cursor-pointer py-3 px-4 text-white focus:bg-slate-700/50">
          <Info className="mr-3 h-4 w-4 text-blue-400" />
          <span>About</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-slate-600/30" />
        
        <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-500/10 cursor-pointer py-3 px-4 focus:bg-red-500/10">
          <LogOut className="mr-3 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

      {isVendor && (
        <VendorProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </>
  );
};
