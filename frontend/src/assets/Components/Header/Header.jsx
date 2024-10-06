import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navigations = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
];

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    checkLoginStatus();


    window.addEventListener('storage', handleStorageChange);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token);
  };

  const handleStorageChange = (e) => {
    if (e.key === 'jwtToken') {
      checkLoginStatus();
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after signing out
  };

  return (
    <header className="text-black body-font shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={'/'} className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-black rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Shopping Cart</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {navigations.map((navigation) => (
            <Link to={navigation.path} key={navigation.name} className='mr-5 hover:text-gray-600'>
              {navigation.name}
            </Link>
          ))}
        </nav>
        <Link to={'/cart'} className="inline-flex items-center bg-black border-0 py-2 px-4 text-white focus:outline-none hover:bg-white hover:text-black rounded text-base mt-4 md:mt-0">
          Go To Cart
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        {isLoggedIn ? (
          <button onClick={handleSignOut} className="inline-flex items-center bg-red-500 border-0 py-2 px-4 text-white focus:outline-none hover:bg-red-600 rounded text-base mt-4 md:mt-0 ml-4">
            Sign Out
          </button>
        ) : (
          <Link to={'/login'} className="inline-flex items-center bg-black border-0 py-2 px-4 text-white focus:outline-none hover:bg-white hover:text-black rounded text-base mt-4 md:mt-0 ml-4">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;