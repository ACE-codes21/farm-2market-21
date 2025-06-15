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
      // Remove user session from localStorage
      localStorage.removeItem('userSession');
      // Sign out from Supabase (ignore errors for now)
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
      // Immediately redirect to home (window.location reload guarantees full reset)
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

  // Redesigned dropdown: glassy, soft blur, shadow, subtle border, bright hover
  return (
    <>
      <DropdownMenuContent 
        align="end"
        className="w-72 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-[#212A34]/90 border border-slate-600/40 rounded-xl shadow-2xl backdrop-blur-lg z-[9999] p-0"
      >
        <DropdownMenuLabel className="font-bold text-lg py-4 px-6 text-white border-b border-slate-700/30 bg-transparent">
          Welcome, <span className="text-green-400">{displayName}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-600/30" />
        
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="flex items-center gap-3 hover:bg-green-700/20 hover:text-green-400 cursor-pointer py-3 px-6 text-white focus:bg-green-800/20 group transition-all"
        >
          <UserIcon className="h-5 w-5 text-slate-300 group-hover:text-green-400" />
          <span>Profile</span>
          {isVendor && <MapPin className="ml-auto h-5 w-5 text-green-400" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleMenuAction('favorites')}
          className="flex items-center gap-3 hover:bg-red-500/10 hover:text-red-400 cursor-pointer py-3 px-6 text-white focus:bg-red-700/10 group transition-all"
        >
          <Heart className="h-5 w-5 text-red-400 group-hover:animate-pulse" />
          <span>Favorites</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleMenuAction('notifications')}
          className="flex items-center gap-3 hover:bg-yellow-500/10 hover:text-yellow-300 cursor-pointer py-3 px-6 text-white focus:bg-yellow-700/10 group transition-all"
        >
          <Bell className="h-5 w-5 text-yellow-400 group-hover:animate-bounce" />
          <span>Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-600/30" />

        <DropdownMenuItem
          onClick={() => handleMenuAction('settings')}
          className="flex items-center gap-3 hover:bg-slate-600/20 hover:text-white cursor-pointer py-3 px-6 text-slate-200 focus:bg-slate-700/30 group"
        >
          <Settings className="h-5 w-5 text-slate-400 group-hover:text-green-300" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleMenuAction('security')}
          className="flex items-center gap-3 hover:bg-blue-800/10 hover:text-blue-300 cursor-pointer py-3 px-6 text-slate-200 focus:bg-blue-900/20 group"
        >
          <Shield className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
          <span>Security</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleMenuAction('billing')}
          className="flex items-center gap-3 hover:bg-green-800/10 hover:text-green-300 cursor-pointer py-3 px-6 text-slate-200 focus:bg-green-900/20 group"
        >
          <CreditCard className="h-5 w-5 text-green-400 group-hover:text-green-300" />
          <span>Billing</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-600/30" />

        <DropdownMenuItem
          onClick={() => handleMenuAction('help')}
          className="flex items-center gap-3 hover:bg-purple-800/10 hover:text-purple-300 cursor-pointer py-3 px-6 text-slate-200 focus:bg-purple-900/20 group"
        >
          <HelpCircle className="h-5 w-5 text-purple-400 group-hover:text-purple-300" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleMenuAction('about')}
          className="flex items-center gap-3 hover:bg-blue-800/10 hover:text-blue-300 cursor-pointer py-3 px-6 text-slate-200 focus:bg-blue-900/20 group"
        >
          <Info className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
          <span>About</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700/20" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:bg-red-700/10 hover:text-red-500 cursor-pointer py-3 px-6 focus:bg-red-900/10 group transition-all"
        >
          <LogOut className="h-5 w-5 group-hover:-rotate-12" />
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
