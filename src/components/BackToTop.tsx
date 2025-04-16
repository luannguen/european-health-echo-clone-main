import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Function to check if user is at bottom of page
  const checkScrollPosition = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    
    // Show button when scrolled down 300px
    setIsVisible(scrollPosition > 300);
    
    // Check if user is near the bottom of the page
    setIsAtBottom(scrollPosition + windowHeight > fullHeight - 200);
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    
    // Initial check
    checkScrollPosition();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg transition-all duration-300 hover:scale-110 group ${
        isAtBottom ? 'opacity-90' : 'opacity-40 hover:opacity-90'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp 
        className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-1" 
      />
      
      {/* Ripple animation on hover */}
      <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ripple"></span>
    </button>
  );
};

export default BackToTop;