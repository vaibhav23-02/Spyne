import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

function ProductListPage() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("authToken");

        console.log(token);

        if (!token) {
          setError("Unauthorized access: No token found");
          console.warn("No token found in localStorage");
          return;
        }

        const response = await axiosInstance.get("/cars", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to fetch cars. Please try again later.");
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Cars</h1>

        {/* Display Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Car List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car._id} className="p-4 bg-white shadow rounded">
                {/* Car Images */}
                <div className="mb-2">
                  {car.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${car.title} image ${index + 1}`}
                      className="w-full h-48 object-cover rounded mb-1"
                    />
                  ))}
                </div>

                {/* Car Title */}
                <h2 className="text-xl font-bold mb-1">{car.title}</h2>

                {/* Car Description */}
                <p className="text-gray-700 mb-2">{car.description}</p>

                {/* View Details Button */}
                <Link to={`/products/${car._id}`}>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p>No cars available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
