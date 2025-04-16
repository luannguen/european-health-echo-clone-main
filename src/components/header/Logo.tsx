import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/assets/svg/logo.svg" 
        alt="VRC - Tổng công ty Kỹ thuật lạnh Việt Nam" 
        className="h-[150px]"
      />
    </Link>
  );
};

export default Logo;