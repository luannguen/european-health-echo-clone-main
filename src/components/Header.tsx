import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './header/Logo';
import MainNavigation from './header/MainNavigation';
import LanguageSwitcher from './header/LanguageSwitcher';
import SearchComponent from './header/SearchComponent';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* TopContact integrated into Header */}
      <div className="bg-primary/10 backdrop-blur-sm border-b border-gray-200/20">
        <div className="container-custom">
          <div className="flex justify-end items-center py-1 text-sm">
            {/* Phone number */}
            <a href="tel:+842812345678" className="flex items-center text-primary mr-6 hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+84 (28) 1234 5678</span>
            </a>

            {/* Zalo - fixed path with absolute URL */}
            <a 
              href="https://zalo.me/your_zalo_id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center mx-3 hover:opacity-80 transition-opacity"
              aria-label="Zalo"
            >
              <img 
                src="/assets/svg/zalo.svg" 
                alt="Zalo" 
                className="w-5 h-5" 
              />
            </a>

            {/* Facebook */}
            <a 
              href="https://facebook.com/your_profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary ml-3 hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-primary/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-1.5">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <MainNavigation />

            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchComponent />
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <SearchComponent isMobile={true} />
              <button onClick={toggleMenu} className="text-white p-1">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-light/10 backdrop-blur-sm animate-slide-in-right">
            <div className="container-custom py-4">
              <MainNavigation isMobile={true} />
              <LanguageSwitcher isMobile={true} />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
