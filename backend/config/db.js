import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ambrishrao2494:Ambrish2494@cluster0.e5xna8z.mongodb.net/RecipE-Project').then(() => console.log("MongoDB connected successfully"));
}


