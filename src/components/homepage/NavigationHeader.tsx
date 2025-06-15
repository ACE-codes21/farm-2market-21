
import React, { useState } from "react";
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
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
];

const NavigationHeader: React.FC = () => {
  // For demonstration, use state to simulate user login.
  const [selectedLang, setSelectedLang] = useState("en");
  const [userLoggedIn] = useState(true);

  // Simulate user object
  const user = {
    name: "Jane Doe",
    avatar: "", // You could add a user avatar URL here.
    email: "janedoe@example.com",
  };

  return (
    <header className="relative z-20 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-2 sm:px-6 py-1.5 sm:py-2">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="block rounded-full bg-gradient-to-br from-green-500 to-green-600 p-[2.5px] mr-2">
            <span className="flex items-center px-1.5 py-0.5 bg-white rounded-full border border-green-400 text-sm font-extrabold font-display shadow">
              <span className="text-green-500">F</span>
              <span className="mx-0.5 text-white drop-shadow font-bold">2</span>
              <span className="text-orange-400">M</span>
            </span>
          </span>
          <span className="hidden md:inline-block ml-1 text-lg font-extrabold text-gray-700 tracking-tight font-display">Farm2Market</span>
        </div>

        {/* Center navigation */}
        <nav className="hidden md:flex gap-2 xl:gap-4 items-center mx-4 flex-1 justify-center">
          <span className="px-3 py-2 rounded font-semibold text-gray-600 transition hover:bg-green-50 cursor-pointer">Home</span>
          <span className="px-3 py-2 rounded font-semibold text-gray-600 transition hover:bg-green-50 cursor-pointer">Why Us?</span>
          <span className="px-3 py-2 rounded font-semibold text-gray-600 transition hover:bg-green-50 cursor-pointer">How It Works</span>
          <span className="px-3 py-2 rounded font-semibold text-gray-600 transition hover:bg-green-50 cursor-pointer">Pricing</span>
          <span className="px-3 py-2 rounded font-semibold text-gray-600 transition hover:bg-green-50 cursor-pointer">Resources</span>
          <span className="px-3 py-2 rounded font-semibold text-gray-600 transition hover:bg-green-50 cursor-pointer">Support</span>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-green-100 focus:bg-green-100 transition focus:ring-2 focus:ring-green-300 focus:outline-none group"
                aria-label="Select Language"
              >
                <span>
                  {LANGUAGES.find(l => l.code === selectedLang)?.name || "Language"}
                </span>
                <ChevronDown
                  className="ml-1 h-4 w-4 text-gray-500 group-hover:text-green-400 transition"
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Select language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={cn(
                    "cursor-pointer py-2 px-4 rounded",
                    lang.code === selectedLang && "bg-green-100 font-bold"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User/Me Section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center px-2 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white hover:bg-green-50 transition group">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-green-400 to-orange-300 flex items-center justify-center mr-2 shadow">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="hidden sm:inline text-gray-800 font-medium mr-1">Me</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500 group-hover:text-green-400 transition" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {userLoggedIn ? (
                <>
                  <DropdownMenuLabel className="font-semibold text-base py-2">Signed in as</DropdownMenuLabel>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-green-400 to-orange-400 flex items-center justify-center shadow">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
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
                      <span>About Farm2Market</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Not signed in</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Log in</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Mobile nav bar */}
      <nav className="flex md:hidden gap-1.5 items-center justify-center px-2 pb-1 pt-2">
        <span className="px-2 py-1 text-[15px] rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">Home</span>
        <span className="px-2 py-1 text-[15px] rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">Why Us?</span>
        <span className="px-2 py-1 text-[15px] rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">How It Works</span>
        <span className="px-2 py-1 text-[15px] rounded text-gray-700 hover:bg-green-50 transition cursor-pointer">Pricing</span>
      </nav>
    </header>
  );
};

export default NavigationHeader;
