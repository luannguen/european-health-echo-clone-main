import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchComponentProps {
  isMobile?: boolean;
}

const SearchComponent = ({ isMobile = false }: SearchComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery('');
    }
  };
  return (
    <div className="relative" ref={searchContainerRef}>
      <button 
        className={`navbar-link ${isOpen ? 'text-accent' : ''} relative z-50`} 
        onClick={toggleSearch}
        aria-label="Search"
      >
        <motion.div
          animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={20} /> : <Search size={20} />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Search container */}            <motion.div 
              initial={{ 
                width: "0%", 
                opacity: 0
              }}
              animate={{ 
                opacity: 1,
                width: isMobile ? "90%" : "80%"
              }}
              exit={{ 
                opacity: 0,
                width: "0%"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className={`
                fixed ${isMobile ? 'top-16 right-4' : 'top-16 left-[10%]'} 
                bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl 
                border border-gray-200/50 dark:border-gray-700/50
                backdrop-blur-md z-50 overflow-hidden
              `}
            >
              <form onSubmit={handleSearch} className="flex items-center p-3">
                <div className="flex-1 flex items-center relative">
                  <Search size={18} className="absolute left-3 text-gray-400" />
                  <motion.input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Type to search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 p-3 pl-10 bg-transparent rounded-md 
                              border border-gray-200 dark:border-gray-600
                              focus:ring-2 focus:ring-primary focus:border-transparent
                              outline-none text-gray-800 dark:text-white w-full
                              placeholder-gray-500 dark:placeholder-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    autoFocus
                  />
                </div>
                
                <motion.div 
                  className="flex items-center ml-3 space-x-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button 
                    type="submit" 
                    className="p-2 bg-primary hover:bg-primary/90 text-white rounded-md 
                              shadow-md hover:shadow-lg transition-all 
                              flex items-center justify-center space-x-1"
                    aria-label="Submit search"
                  >
                    <span>Search</span>
                    <Search size={16} />
                  </button>
                </motion.div>
              </form>
              
              {/* Quick categories/suggestions - optional enhancement */}
              <motion.div 
                className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700 pt-2 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-xs text-gray-500 dark:text-gray-400">Popular:</span>
                {['Technologies', 'Services', 'Products', 'Support'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      searchInputRef.current?.focus();
                    }}
                    className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-700 
                              text-gray-700 dark:text-gray-300 rounded-full 
                              hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchComponent;
