
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
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

export const UserDropdown: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

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

      // Clear user session from local storage
      localStorage.removeItem('userSession');
      
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });

      // Redirect to homepage using React Router
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
    switch (action) {
      case 'profile':
        console.log('Opening profile section');
        toast({
          title: "Profile",
          description: "Profile section coming soon!",
        });
        break;
      case 'settings':
        console.log('Opening settings section');
        toast({
          title: "Settings",
          description: "Settings section coming soon!",
        });
        break;
      case 'security':
        console.log('Opening security section');
        toast({
          title: "Security",
          description: "Security section coming soon!",
        });
        break;
      case 'billing':
        console.log('Opening billing section');
        toast({
          title: "Billing",
          description: "Billing section coming soon!",
        });
        break;
      case 'notifications':
        console.log('Opening notifications section');
        toast({
          title: "Notifications",
          description: "Notifications section coming soon!",
        });
        break;
      case 'favorites':
        console.log('Opening favorites section');
        toast({
          title: "Favorites",
          description: "Favorites section coming soon!",
        });
        break;
      case 'help':
        console.log('Opening help section');
        toast({
          title: "Help",
          description: "Help section coming soon!",
        });
        break;
      case 'about':
        console.log('Opening about section');
        toast({
          title: "About",
          description: "About section coming soon!",
        });
        break;
      default:
        break;
    }
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="hidden sm:inline">{getUserDisplayName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-white border border-gray-200 shadow-lg z-50"
      >
        <DropdownMenuLabel className="font-bold text-lg py-3">
          Welcome, {getUserDisplayName()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('profile')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <User className="mr-3 h-4 w-4 text-gray-600" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('favorites')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <Heart className="mr-3 h-4 w-4 text-red-500" />
          <span>Favorites</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('notifications')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <Bell className="mr-3 h-4 w-4 text-yellow-500" />
          <span>Notifications</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('settings')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <Settings className="mr-3 h-4 w-4 text-gray-600" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('security')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <Shield className="mr-3 h-4 w-4 text-blue-500" />
          <span>Security</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('billing')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <CreditCard className="mr-3 h-4 w-4 text-green-500" />
          <span>Billing</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('help')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <HelpCircle className="mr-3 h-4 w-4 text-purple-500" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleMenuAction('about')}
          className="hover:bg-gray-100 cursor-pointer py-3 px-4"
        >
          <Info className="mr-3 h-4 w-4 text-blue-500" />
          <span>About</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-red-600 hover:bg-red-50 cursor-pointer py-3 px-4"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
