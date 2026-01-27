import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'rw';
  currency: 'USD' | 'RWF';
  setLanguage: (lang: 'en' | 'rw') => void;
  setCurrency: (curr: 'USD' | 'RWF') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'rw'>('en');
  const [currency, setCurrency] = useState<'USD' | 'RWF'>('USD');

  return (
    <LanguageContext.Provider value={{ language, currency, setLanguage, setCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
