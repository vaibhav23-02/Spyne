import { cloudinary } from '../utils/cloudinaryConfig.js'; 
import Car from '../models/carModel.js';
import fs from 'fs';

export const createCar = async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      const imageUrls = [];
  
      // Check if files are present in the request (handled by multer)
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          // Upload image to Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'cars', // Specify the folder name on Cloudinary
          });
  
          // Push the returned image URL from Cloudinary to imageUrls
          imageUrls.push(result.secure_url);
  
          // Delete the file from the local server after uploading to Cloudinary
          fs.unlinkSync(file.path);
        }
      }
  
      // Create car in the database, storing the image URLs and other car details
      const car = await Car.create({
        title,
        description,
        tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
        images: imageUrls, // Store the image URLs in the database
        userId: req.user.id, // Assuming `req.user.id` contains the user's ID
      });
  
      res.status(201).json(car); // Send the created car as response
    } catch (error) {
      console.error('Error creating car:', error);
      res.status(400).json({ error: error.message });
    }
  };

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user.id });
    res.json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, userId: req.user.id });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, tags, images, updatedAt: Date.now() },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};