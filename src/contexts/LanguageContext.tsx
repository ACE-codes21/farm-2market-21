
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage on mount
  useEffect(() => {
    console.log('LanguageProvider: Initializing...');
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      console.log('LanguageProvider: Found saved language:', savedLanguage);
      setCurrentLanguage(savedLanguage);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    
    // Load translations when language changes
    const loadTranslations = async () => {
      console.log('LanguageProvider: Loading translations for:', currentLanguage);
      try {
        const translationModule = await import(`../translations/${currentLanguage}.ts`);
        console.log('LanguageProvider: Translations loaded successfully');
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to empty object
        setTranslations({});
      }
    };

    loadTranslations();
  }, [currentLanguage, isInitialized]);

  const setLanguage = (lang: Language) => {
    console.log('LanguageProvider: Setting language to:', lang);
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key; // Return the key itself as fallback
    }
    return translation;
  };

  // Don't render children until initialized
  if (!isInitialized) {
    console.log('LanguageProvider: Still initializing...');
    return null;
  }

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t
  };

  console.log('LanguageProvider: Rendering with context:', contextValue);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
