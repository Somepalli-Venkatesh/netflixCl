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
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center flex-col md:flex-row">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-white">
              <img src={netflix} alt="Netflix Logo" className="h-16 w-30" />
            </a>
          </div>

          {/* Search and Login Button */}
          <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto">
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 rounded-lg text-black focus:outline-none w-full md:w-auto"
            />
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none w-full md:w-auto"
              onClick={handleLoginClick} // Navigate to SignIn page
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center px-4 sm:px-8">
        <h2 className="text-white text-4xl font-bold sm:text-5xl pt-32 sm:pt-40">
          Unlimited movies, TV shows and more
        </h2>
        <h2 className="text-white text-xl mt-2 sm:text-2xl">
          Starts at ₹149. Cancel at any time.
        </h2>
        <p className="text-white mt-4 text-sm sm:text-base">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
      </div>
    </div>
  );
};

export default Home;
