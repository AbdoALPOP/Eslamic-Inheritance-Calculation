import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-gray-500" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            language === 'en'
              ? 'bg-white text-islamic-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            language === 'ar'
              ? 'bg-white text-islamic-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          العربية
        </button>
      </div>
    </div>
  );
};