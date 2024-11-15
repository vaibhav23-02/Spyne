import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Fetch the existing car details to prepopulate the form
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }

        const response = await axiosInstance.get(`/cars/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });

        const car = response.data;
        setTitle(car.title);
        setDescription(car.description);
        setTags(car.tags.join(", ")); // Join tags array to a comma-separated string
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCar();
  }, [id]);

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

      await axiosInstance.put(`/cars/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      setStatusMessage("Car updated successfully!");
      navigate(`/cars/${id}`); // Navigate to the car detail page after updating
    } catch (error) {
      setStatusMessage("Failed to update car. Please try again.");
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Car</h1>
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
          <label className="block text-gray-700">
            Upload New Images (optional)
          </label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Update Car
        </button>
      </form>
      {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
    </div>
  );
}

export default EditCarPage;
