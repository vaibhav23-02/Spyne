// import React, { useState } from 'react';
// import axios from 'axios';

// function ProductCreationPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');
//   const [images, setImages] = useState(null);
//   const [statusMessage, setStatusMessage] = useState('');

//   const handleFileChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('tags', tags);
//     if (images) {
//       Array.from(images).forEach((image) => formData.append('images', image));
//     }

//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         console.warn("No token found in localStorage");
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/api/cars/', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' ,
//             Authorization: "Bearer " +token},
//       });
//       setStatusMessage('Car added successfully!');
//       setTitle('');
//       setDescription('');
//       setTags('');
//       setImages(null);
//     } catch (error) {
//       setStatusMessage('Failed to add car. Please try again.');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
//         <div className="mb-4">
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             className="w-full p-2 border border-gray-300 rounded"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Tags (comma separated)</label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Upload Images</label>
//           <input type="file" multiple onChange={handleFileChange} />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
//           Add Car
//         </button>
//       </form>
//       {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
//     </div>
//   );
// }

// export default ProductCreationPage;

import React, { useState } from "react";
import axios from "axios";

function ProductCreationPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Convert the comma-separated tags string to an array
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tagsArray)); // Convert tags array to JSON string

    if (images) {
      Array.from(images).forEach((image) => formData.append("images", image));
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.warn("No token found in localStorage");
        return;
      }

      const response = await axios.post(
        "https://car2-2.onrender.com/api/cars/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      setStatusMessage("Car added successfully!");
      setTitle("");
      setDescription("");
      setTags("");
      setImages(null);
    } catch (error) {
      setStatusMessage("Failed to add car. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Images</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Car
        </button>
      </form>
      {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
    </div>
  );
}

export default ProductCreationPage;
