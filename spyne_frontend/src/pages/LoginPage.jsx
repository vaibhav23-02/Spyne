import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

function LoginPage() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Assuming the response contains a token
      console.log(response);
      const token = await response.data.token;
      localStorage.setItem("authToken", token); // Save token to local storage

      // Navigate to products page upon successful login
      navigate("/products");
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
