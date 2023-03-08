import dotenv from "dotenv";
import connectDB from "../config/dbConnect.js";
import Product from "../models/ProductModel.js";
import { products } from "./data.js";
dotenv.config();

connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("products deleted");
    await Product.insertMany(products);
    console.log("products added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();
