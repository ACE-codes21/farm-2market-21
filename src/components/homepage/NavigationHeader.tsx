
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

const NAV_LINKS = [
  { label: "Home" },
  { label: "Why Us?" },
  { label: "How It Works" },
  { label: "Pricing" },
  { label: "Resources" },
  { label: "Support" }, // Support added here
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

  // -- Compact, no-background, minimal nav styles --
  return (
    <header className="w-full z-30">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 flex items-center justify-between min-h-[40px]">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <span className="block h-7 w-7 rounded-full flex items-center justify-center border border-green-200 shadow-none">
            <span className="flex font-display text-base font-bold tracking-tight select-none">
              <span className="text-green-500" style={{ fontWeight: 700 }}>F</span>
              <span className="mx-[1px] text-white font-bold drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]">2</span>
              <span className="text-orange-500">M</span>
            </span>
          </span>
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-2">
          {NAV_LINKS.map(({ label }, idx) => (
            <span
              key={label}
              className={cn(
                "px-1.5 py-1 text-xs font-semibold rounded",
                "text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
              )}
              style={{
                fontSize: "0.92rem",
                letterSpacing: "0.01em",
                ...(idx === 0 && { fontWeight: 700 })
              }}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* Right controls - Language + User */}
        <div className="flex items-center gap-1.5">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold text-gray-700 hover:text-green-600 focus:outline-none focus:ring-1 focus:ring-green-300 transition"
                aria-label="Select Language"
                style={{ background: "transparent", boxShadow: "none" }}
              >
                <span>{LANGUAGES.find(l => l.code === selectedLang)?.name || "Language"}</span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-0.5" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuLabel>Select language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={cn(
                    "cursor-pointer text-xs",
                    lang.code === selectedLang && "bg-green-100 font-bold"
                  )}
                  style={{ background: "transparent" }}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* User/Me Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center px-1 py-1 rounded focus:outline-none group border border-transparent transition"
                aria-label="Account"
                style={{ background: "transparent" }}
              >
                <div className="h-7 w-7 rounded-full flex items-center justify-center mr-1 bg-gradient-to-tr from-green-300 to-orange-200">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden sm:inline text-gray-800 text-xs font-medium mr-0.5">Me</span>
                <ChevronDown className="h-3 w-3 text-gray-500 group-hover:text-green-400 transition" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {session && profile ? (
                <>
                  <DropdownMenuLabel className="font-semibold text-xs py-2">
                    {profile.name || "Signed in"}
                  </DropdownMenuLabel>
                  <div className="flex items-center gap-3 px-4 py-1">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-green-400 to-orange-400 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-800">{profile.name || "User"}</span>
                      <span className="text-[10px] text-gray-500">{profile.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-1.5 cursor-pointer hover:text-green-600">
                      <User className="h-4 w-4 text-green-500" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-1.5 cursor-pointer hover:text-lime-600">
                      <Shield className="h-4 w-4 text-lime-500" />
                      <span>Security</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-1.5 cursor-pointer hover:text-orange-600">
                      <Settings className="h-4 w-4 text-orange-500" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-4 py-1.5 cursor-pointer hover:text-blue-600">
                      <Info className="h-4 w-4 text-blue-400" />
                      <span>About</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-2 px-4 py-1.5 text-red-600 cursor-pointer hover:text-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel className="text-xs">Not signed in</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-xs"
                    onClick={async () => {
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

      {/* Mobile nav: minimal */}
      <nav className="flex md:hidden gap-1 items-center justify-center px-2 pb-1 pt-2">
        {NAV_LINKS.slice(0, 4).map(({ label }) => (
          <span key={label} className="px-2 py-1 text-xs rounded text-gray-700 hover:text-green-600 transition cursor-pointer">
            {label}
          </span>
        ))}
        <span className="px-2 py-1 text-xs rounded text-gray-700 hover:text-green-600 transition cursor-pointer">Support</span>
      </nav>
    </header>
  );
};

export default NavigationHeader;
