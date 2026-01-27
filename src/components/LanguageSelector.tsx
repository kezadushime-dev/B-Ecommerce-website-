import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, DollarSign } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, currency, setLanguage, setCurrency } = useLanguage();

  return (
    <div className="flex items-center gap-4">
      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <Globe size={16} className="text-slate-400" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'rw')}
          className="bg-transparent text-sm font-medium text-slate-700 border-none outline-none cursor-pointer"
        >
          <option value="en">English</option>
          <option value="rw">Kinyarwanda</option>
        </select>
      </div>

      {/* Currency Selector */}
      <div className="flex items-center gap-2">
        <DollarSign size={16} className="text-slate-400" />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as 'USD' | 'RWF')}
          className="bg-transparent text-sm font-medium text-slate-700 border-none outline-none cursor-pointer"
        >
          <option value="USD">USD</option>
          <option value="RWF">RWF</option>
        </select>
      </div>
    </div>
  );
};
