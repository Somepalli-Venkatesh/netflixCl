import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      toast.error("Passwords do not match!"); // Display error toast
      return;
    }

    try {
      // Make the API request
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful registration
        toast.success("User registered successfully!"); // Success toast
        setErrorMessage("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        // On failed registration
        setErrorMessage(data.message || "Something went wrong.");
        toast.error(data.message || "Something went wrong."); // Error toast
      }
    } catch (error) {
      setErrorMessage("Unable to connect to the server.");
      toast.error("Unable to connect to the server."); // Error toast
    }
  };

  // Handle the SignIn link click
  const handleSignInClick = () => {
    navigate("/signin"); // Navigate to the SignIn page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="max-w-md w-full p-6 rounded-md shadow-md"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
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
          <div>
            <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full p-4 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
        
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-lg font-semibold rounded hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="#"
            onClick={handleSignInClick} // Trigger the SignIn navigation
            className="text-white hover:underline"
          >
            Sign in now.
          </a>
        </p>
        <p className="mt-4 text-xs text-gray-400">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Learn more.
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
