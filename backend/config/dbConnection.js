import mongoose from "mongoose";
import "dotenv/config";

const db_Url = process.env.DB_URL;
const dbConnection = async () => {
  try {
    await mongoose.connect(db_Url);
    console.log("db Connected Successfully");
  } catch (error) {
    process.exit(1);
    console.log(`Error occur in dbConnection file => ${error.message}`);
  }
};
export default dbConnection;
