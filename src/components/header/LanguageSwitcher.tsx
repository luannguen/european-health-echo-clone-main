import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface LanguageOption {
  code: string;
  name: string;
  flagIcon: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'VI', name: 'Tiếng Việt', flagIcon: '/assets/svg/flags/vi-flag.svg' },
  { code: 'EN', name: 'English', flagIcon: '/assets/svg/flags/en-flag.svg' },
  { code: 'DE', name: 'Deutsch', flagIcon: '/assets/svg/flags/de-flag.svg' },
  { code: 'FR', name: 'Français', flagIcon: '/assets/svg/flags/fr-flag.svg' },
  { code: 'RU', name: 'Русский', flagIcon: '/assets/svg/flags/ru-flag.svg' },
  { code: 'HR', name: 'Hrvatski', flagIcon: '/assets/svg/flags/hr-flag.svg' },
  { code: 'SL', name: 'Slovenščina', flagIcon: '/assets/svg/flags/sl-flag.svg' },
  { code: 'SR', name: 'Српски', flagIcon: '/assets/svg/flags/sr-flag.svg' },
];

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

const LanguageSwitcher = ({ isMobile = false }: LanguageSwitcherProps) => {
  const [activeLanguage, setActiveLanguage] = useState('VI');

  const getActiveLanguageDetails = () => {
    return languageOptions.find(lang => lang.code === activeLanguage) || languageOptions[0];
  };

  if (isMobile) {
    return (
      <div className="pt-4 border-t border-white/20">
        <div className="flex flex-col space-y-2">
          <span className="text-white text-sm">Ngôn ngữ</span>
          <select 
            value={activeLanguage}
            onChange={(e) => setActiveLanguage(e.target.value)}
            className="bg-primary-light/10 text-white border border-white/30 rounded p-2"
          >
            {languageOptions.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="navbar-link flex items-center">
        <img 
          src={getActiveLanguageDetails().flagIcon} 
          alt={getActiveLanguageDetails().name} 
          className="w-5 h-5 mr-1"
        />
        <span>{activeLanguage}</span>
        <ChevronDown size={16} className="ml-1" />
      </button>
      <div className="absolute hidden group-hover:block bg-white/10 backdrop-blur-sm shadow-lg p-4 rounded min-w-32 right-0">
        <div className="flex flex-col space-y-2">
          {languageOptions.map(lang => (
            <button 
              key={lang.code}
              onClick={() => setActiveLanguage(lang.code)} 
              className={`flex items-center text-left ${activeLanguage === lang.code ? 'text-accent font-medium' : 'text-primary'}`}
            >
              <img 
                src={lang.flagIcon} 
                alt={lang.name} 
                className="w-5 h-5 mr-2"
              />
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;