
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import { useUserSession } from '@/hooks/useUserSession';
import { UserMenuItems } from './UserMenuItems';

export const UserMenu: React.FC = () => {
  const user = useUserSession();

  if (!user) {
    return null;
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const displayName = getUserDisplayName();

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
          <span className="hidden sm:inline">{displayName}</span>
        </Button>
      </DropdownMenuTrigger>
      <UserMenuItems user={user} displayName={displayName} />
    </DropdownMenu>
  );
};
