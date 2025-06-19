
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  
  const languages = [
    { code: 'en' as const, name: 'English' },
    { code: 'hi' as const, name: 'हिन्दी' },
  ];

  const handleLanguageChange = (languageCode: 'en' | 'hi') => {
    setLanguage(languageCode);
    console.log(`Language changed to: ${languageCode}`);
  };

  const getCurrentLanguageName = () => {
    const currentLang = languages.find(lang => lang.code === currentLanguage);
    return currentLang?.name || 'English';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white border border-gray-200 shadow-lg z-50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`hover:bg-gray-100 cursor-pointer py-2 px-3 ${
              currentLanguage === language.code ? 'bg-green-50 text-green-700' : ''
            }`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
