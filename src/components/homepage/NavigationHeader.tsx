
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, LogOut, Shield, Settings, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

const NavigationHeader: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<{ name?: string; email?: string; } | null>(null);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        // Try to get name/email; fallback to email if no name
        setProfile({
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
          email: session.user.email,
        });
      } else {
        setProfile(null);
      }
    };

    getSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        setProfile({
          name: newSession.user.user_metadata?.full_name || newSession.user.user_metadata?.name,
          email: newSession.user.email
        });
      } else {
        setProfile(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  // Aesthetic styles
  const barClass =
    "sticky top-0 w-full z-30 bg-white/60 backdrop-blur-lg shadow-md ring-1 ring-white/40 border-b border-white/20";
  const containerClass =
    "max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between min-h-[52px]";
  const logoClass =
    "h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-inner";
  const navClass =
    "hidden md:flex flex-1 justify-center items-center gap-1.5";
  const navLink =
    "px-2 py-0.5 text-sm font-semibold rounded transition-colors text-gray-700 hover:bg-green-100";
  const rightClass = "flex items-center gap-2";

  return (
    <header className={barClass}>
      <div className={containerClass}>
        {/* F2M Logo */}
        <div className={logoClass}>
          <span className="flex items-center select-none font-display text-base font-extrabold tracking-tight">
            <span className="text-green-500" style={{fontWeight:700}}>F</span>
            <span className="mx-[1px] text-white font-bold">2</span>
            <span className="text-orange-400">M</span>
          </span>
        </div>

        {/* Center nav */}
        <nav className={navClass}>
          <span className={navLink}>Home</span>
          <span className={navLink}>Why Us?</span>
          <span className={navLink}>How It Works</span>
          <span className={navLink}>Pricing</span>
          <span className={navLink + " hidden xl:inline"}>Resources</span>
          <span className={navLink + " hidden xl:inline"}>Support</span>
        </nav>

        {/* Right controls */}
        <div className={rightClass}>
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-gray-700 bg-white/70 hover:bg-green-100 transition focus:outline-none focus:ring-1 focus:ring-green-300"
                aria-label="Select Language"
              >
                <span>{LANGUAGES.find(l => l.code === selectedLang)?.name || "Language"}</span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-0.5" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Select language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={cn(
                    "cursor-pointer text-sm",
                    lang.code === selectedLang && "bg-green-100 font-bold"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Me/User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center px-1.5 py-1.5 rounded-lg focus:outline-none group bg-white/60 hover:bg-green-50 border border-transparent focus:ring-1 focus:ring-green-400 transition"
                aria-label="Account"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-400 to-orange-400 flex items-center justify-center mr-1 shadow-sm">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden sm:inline text-gray-800 text-sm font-medium mr-1">Me</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500 group-hover:text-green-400 transition" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {session && profile ? (
                <>
                  <DropdownMenuLabel className="font-semibold text-sm py-2">
                    {profile.name || "Signed in"}
                  </DropdownMenuLabel>
                  <div className="flex items-center gap-3 px-4 py-1">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-400 to-orange-400 flex items-center justify-center shadow">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-800">{profile.name || "User"}</span>
                      <span className="text-[11px] text-gray-500">{profile.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-green-50">
                      <User className="h-4 w-4 text-green-500" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-lime-50">
                      <Shield className="h-4 w-4 text-lime-500" />
                      <span>Security</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-orange-50">
                      <Settings className="h-4 w-4 text-orange-500" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-blue-50">
                      <Info className="h-4 w-4 text-blue-400" />
                      <span>About</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Not signed in</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={async () => {
                      // Redirect to login page
                      window.location.href = "/login";
                    }}
                  >
                    Sign In
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex md:hidden gap-1 items-center justify-center px-2 pb-1 pt-2">
        <span className="px-2 py-1 text-xs rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">Home</span>
        <span className="px-2 py-1 text-xs rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">Why Us?</span>
        <span className="px-2 py-1 text-xs rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">How It Works</span>
        <span className="px-2 py-1 text-xs rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">Pricing</span>
      </nav>
    </header>
  );
};
export default NavigationHeader;
