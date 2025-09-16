import express from "express"; 
import foodModel from "../models/foodModel.js";
import fs from "fs";


// Add Food Item

const addFood = async (req, res) => {

    let image_filename = `${Date.now()}-${req.file.originalname}`; // Construct the image filename
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename, // Use the constructed filename
    });
    try{
        await food.save();
        res.json({ success: true, message : "Food item added successfully!" });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.json({ success: false, message: "Error adding food item." });
    }
}

// All Food List
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log("Error fetching food items:", error);
        res.json({ success: false, message: "Error fetching food items." });
    }
};

// Remove Food Item

const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,() => {});
    
        await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed successfully!" });
    } catch (error) {
        console.log("Error removing food item:", error);
        res.json({ success: false, message: "Error removing food item." });
    }
}

export { addFood, listFood, removeFood };