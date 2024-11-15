// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axiosInstance from "../api/axiosConfig";

// // function ProductDetailPage() {
// //   const { id } = useParams(); // Get the car ID from the URL
// //   const navigate = useNavigate();
// //   const [car, setCar] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {

// //     const fetchCar = async () => {
// //       try {
// //         const token = localStorage.getItem("authToken");

// //         if (!token) {
// //           setError("Unauthorized access: No token found");
// //           console.warn("No token found in localStorage");
// //           return;
// //         }
// //         const response = await axiosInstance.get(`/cars/${id}`,
// // {
// //   headers: {
// //     Authorization: "Bearer " + token,
// //   },
// // });

// //       } catch (error) {
// //         console.error("Error fetching car details:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCar();
// //   }, [id]);

// //   if (loading) {
// //     return <p>Loading car details...</p>;
// //   }

// //   if (!car) {
// //     return <p>Car not found!</p>;
// //   }

// //   return (
// //     <div className="p-4">
// //       <button
// //         onClick={() => navigate(-1)}
// //         className="text-white bg-gray-600 px-4 py-2 rounded mb-4 hover:bg-gray-700"
// //       >
// //         Back
// //       </button>

// //       {/* Car Details */}
// //       <div className="max-w-lg mx-auto bg-white shadow rounded p-4">
// //         {/* Car Image */}
// //         <img
// //           src={car.images[0]} // Assuming the first image in the array
// //           alt={car.title}
// //           className="w-full h-64 object-cover rounded mb-4"
// //         />

// //         {/* Car Title and Description */}
// //         <h2 className="text-2xl font-bold mb-2">{car.title}</h2>
// //         <p className="text-gray-700 mb-4">{car.description}</p>

// //         {/* Car Tags */}
// //         <div className="flex space-x-2 mb-4">
// //           {car.tags.map((tag, index) => (
// //             <span
// //               key={index}
// //               className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
// //             >
// //               {tag}
// //             </span>
// //           ))}
// //         </div>

// //         {/* Edit and Delete Buttons */}
// //         <div className="flex space-x-4">
// //           <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
// //             Edit
// //           </button>
// //           <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
// //             Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductDetailPage;
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosConfig";

// function ProductDetailPage() {
//   const { id } = useParams(); // Get the car ID from the URL
//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           console.warn("No token found in localStorage");
//           return;
//         }

//         const response = await axiosInstance.get(`/cars/${id}`, {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setCar(response.data);
//       } catch (error) {
//         console.error("Error fetching car details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   if (loading) {
//     return <p>Loading car details...</p>;
//   }

//   if (!car) {
//     return <p>Car not found!</p>;
//   }

//   return (
//     <div className="p-4">
//       <button
//         onClick={() => navigate(-1)}
//         className="text-white bg-gray-600 px-4 py-2 rounded mb-4 hover:bg-gray-700"
//       >
//         Back
//       </button>

//       {/* Car Details */}
//       <div className="max-w-lg mx-auto bg-white shadow rounded p-4">
//         {/* Car Image */}
//         <img
//           src={car.images[0]} // Assuming the first image in the array
//           alt={car.title}
//           className="w-full h-64 object-cover rounded mb-4"
//         />

//         {/* Car Title and Description */}
//         <h2 className="text-2xl font-bold mb-2">{car.title}</h2>
//         <p className="text-gray-700 mb-4">{car.description}</p>

//         {/* Car Tags */}
//         <div className="flex space-x-2 mb-4">
//           {car.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Car Metadata */}
//         <p className="text-gray-500 text-sm">
//           Created At: {new Date(car.createdAt).toLocaleDateString()}
//         </p>
//         <p className="text-gray-500 text-sm mb-4">
//           Updated At: {new Date(car.updatedAt).toLocaleDateString()}
//         </p>

//         {/* Edit and Delete Buttons */}
//         <div className="flex space-x-4">
//           <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//             Edit
//           </button>
//           <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetailPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

function ProductDetailPage() {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }

        const response = await axiosInstance.get(`/cars/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.warn("No token found in localStorage");
        return;
      }

      await axiosInstance.delete(`/cars/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      alert("Car deleted successfully");
      navigate("/products"); // Redirect back to the product list page after deletion
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete car. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (!car) {
    return <p>Car not found!</p>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="text-white bg-gray-600 px-4 py-2 rounded mb-4 hover:bg-gray-700"
      >
        Back
      </button>

      {/* Car Details */}
      <div className="max-w-lg mx-auto bg-white shadow rounded p-4">
        {/* Car Image */}
        <img
          src={car.images[0]} // Assuming the first image in the array
          alt={car.title}
          className="w-full h-64 object-cover rounded mb-4"
        />

        {/* Car Title and Description */}
        <h2 className="text-2xl font-bold mb-2">{car.title}</h2>
        <p className="text-gray-700 mb-4">{car.description}</p>

        {/* Car Tags */}
        <div className="flex space-x-2 mb-4">
          {car.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Car Metadata */}
        <p className="text-gray-500 text-sm">
          Created At: {new Date(car.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          Updated At: {new Date(car.updatedAt).toLocaleDateString()}
        </p>

        {/* Edit and Delete Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
