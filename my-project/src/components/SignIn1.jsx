import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { toast, ToastContainer } from "react-toastify"; // Import both toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const SignIn1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const response = await fetch("https://netflixclone-liard-pi.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, navigate to Movies component
        navigate("/movies"); // Assuming `/movies` is the route for the Movies component
      } else {
        // Login failed, show error toast
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  // Handle the SignUp link click
  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the SignUp page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div
        className="max-w-md w-full p-6 rounded-md shadow-md"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-lg font-semibold rounded hover:bg-red-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400">
          New to Netflix?{" "}
          <a
            href="#"
            onClick={handleSignUpClick} // Trigger the SignUp navigation
            className="text-white hover:underline"
          >
            Sign up now.
          </a>
        </p>
        <p className="mt-4 text-xs text-gray-400">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Learn more.
          </a>
        </p>
      </div>

      {/* Correct placement of ToastContainer */}
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default SignIn1;
