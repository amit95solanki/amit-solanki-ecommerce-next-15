import {connectToDatabase} from  "./index";
import products from "../data"
import Product from "./models/product.model"
import {loadEnvConfig} from '@next/env';
import {cwd} from 'process';

loadEnvConfig(cwd());
const main = async () => {
try{
const productsData= [...products];
await connectToDatabase(process.env.DATABASE_URL);
Product.deleteMany();
const createProduct = await Product.insertMany(productsData);
console.log("Products seeded successfully:", createProduct.length);

process.exit(0);



}catch (error) {
  console.error("Error connecting to the database:", error);
throw new Error("Database connection failed");
}
};

main();
