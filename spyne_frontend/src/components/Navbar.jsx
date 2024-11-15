// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Navbar({ onSearch }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear any session or token here if needed
//     alert("Logged out successfully!");
//     navigate('/');
//   };

//   const handleSearch = (event) => {
//     onSearch(event.target.value); // Pass the search input back to the parent component
//   };

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/products" className="text-white text-2xl font-bold">
//           CARSALL
//         </Link>

//         {/* Search Bar */}
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search cars..."
//             className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//             onChange={handleSearch}
//           />
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session or token here if needed
    alert("Logged out successfully!");
    navigate("/");
  };

  const handleSearch = (event) => {
    onSearch(event.target.value); // Pass the search input back to the parent component
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/products" className="text-white text-2xl font-bold">
          CARS24
        </Link>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search cars..."
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleSearch}
          />
        </div>

        {/* Add Car and Logout Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/products/new")}
            className="text-white bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600"
          >
            Add Car
          </button>

          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
