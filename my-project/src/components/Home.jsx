import React from 'react';
import netflix from '../assets/images/netflix_logo-1.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle navigating to the SignIn page
  const handleLoginClick = () => {
    navigate('/signin'); // Navigate to the SignIn page
  };

  return (
    <div className="bg-main-bg bg-cover bg-center h-screen w-full bg-opacity-30 backdrop-blur">
      <nav className="bg-white-800 text-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo */}
          <div>
            <a href="#" className="text-white">
              <img src={netflix} alt="Netflix Logo" className="h-16 w-30" />
            </a>
          </div>

          {/* Search and Login Button */}
          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 rounded-lg text-black focus:outline-none"
            />
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
              onClick={handleLoginClick} // Navigate to SignIn page
            >
              Login
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div>
        <h2 className="text-center pt-40 text-white text-4xl font-bold">
          Unlimited movies, TV shows and more
        </h2>
        <h2 className="text-center text-white text-xl mt-2">
          Starts at ₹149. Cancel at any time.
        </h2>
        <p className="text-center text-white mt-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
      </div>
    </div>
  );
};

export default Home;
