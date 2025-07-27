import { connectToDatabase } from "./index";
import products from "../data";
import Product from "./models/product.model";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";
import User from "./models/user.model";
import usersData from "../user-data";

loadEnvConfig(cwd());

const main = async () => {
  try {
    const usersDataArray = [...usersData];
    const productsDataArray = [...products];

    await connectToDatabase(process.env.DATABASE_URL);

    await User.deleteMany();
    const createdUser = await User.insertMany(usersDataArray);

    await Product.deleteMany();
    
    // Modify the product insertion to handle duplicate key errors
    const createProduct = await Product.insertMany(productsDataArray, {
      ordered: false, // Allow the operation to continue even if some inserts fail
    }).catch((error: any) => {
      if (error.code === 11000) {
        console.log("Duplicate key error occurred. Some products may not have been inserted.");
      } else {
        console.error("Error inserting products:", error);
        throw error; // Re-throw the error if it's not a duplicate key error
      }
    });

    console.log({ createdUser, createProduct, message: "Products are inserted to DB" });
    process.exit(0);
  } catch (error: any) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
};

main();
