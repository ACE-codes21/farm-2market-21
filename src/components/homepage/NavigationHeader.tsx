
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
import { ChevronDown, User, LogOut, Shield, Settings, Info, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (section: string) => {
    console.log(`Navigate to ${section}`);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Why Us?", href: "#why-us" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
    { name: "Support", href: "#support" },
  ];

  return (
    <header className="sticky top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg ring-2 ring-green-400/30">
              <span className="flex items-center select-none font-display text-lg font-extrabold tracking-tight">
                <span className="text-green-400 neon-text" style={{fontWeight:700}}>F</span>
                <span className="mx-[1px] text-white font-bold neon-text">2</span>
                <span className="text-orange-400 neon-text">M</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className="text-white/90 hover:text-green-400 px-3 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20 rounded-lg hover:bg-green-500/10"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white/90 hover:text-green-400 transition-all duration-300 rounded-lg hover:bg-green-500/10">
                  <span>{LANGUAGES.find(l => l.code === selectedLang)?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-40 bg-black/90 backdrop-blur-xl border border-green-500/30 shadow-2xl shadow-green-500/20"
              >
                <DropdownMenuLabel className="text-green-400">Language</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-green-500/30" />
                {LANGUAGES.map(lang => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={cn(
                      "cursor-pointer text-white/90 hover:bg-green-500/20 hover:text-green-400 transition-colors",
                      lang.code === selectedLang && "bg-green-500/20 text-green-400"
                    )}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile/Auth Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center shadow-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-black/90 backdrop-blur-xl border border-green-500/30 shadow-2xl shadow-green-500/20"
              >
                {session && profile ? (
                  <>
                    <DropdownMenuLabel className="text-green-400 font-semibold">
                      {profile.name || "Welcome"}
                    </DropdownMenuLabel>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-white/90">{profile.name || "User"}</span>
                        <span className="text-xs text-white/60">{profile.email}</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-green-500/30" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="text-white/90 hover:bg-green-500/20 hover:text-green-400 transition-colors cursor-pointer">
                        <User className="h-4 w-4 mr-2 text-green-400" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white/90 hover:bg-green-500/20 hover:text-green-400 transition-colors cursor-pointer">
                        <Settings className="h-4 w-4 mr-2 text-green-400" />
                        Settings
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-green-500/30" />
                    <DropdownMenuItem
                      className="text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel className="text-green-400">Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-green-500/30" />
                    <DropdownMenuItem
                      className="text-white/90 hover:bg-green-500/20 hover:text-green-400 transition-colors cursor-pointer"
                      onClick={() => window.location.href = "/auth"}
                    >
                      <User className="h-4 w-4 mr-2 text-green-400" />
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-white/90 hover:bg-green-500/20 hover:text-green-400 transition-colors cursor-pointer"
                      onClick={() => window.location.href = "/auth"}
                    >
                      <Shield className="h-4 w-4 mr-2 text-green-400" />
                      Sign Up
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-white/90 hover:bg-green-500/20 hover:text-green-400 transition-colors cursor-pointer"
                      onClick={() => window.location.href = "/dashboard"}
                    >
                      <Settings className="h-4 w-4 mr-2 text-green-400" />
                      Dashboard
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-white/90 hover:text-green-400 hover:bg-green-500/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-500/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className="text-left px-4 py-3 text-white/90 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;
