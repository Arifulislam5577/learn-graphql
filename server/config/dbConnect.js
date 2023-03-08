import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
function connectDB() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      if (process.env.NODE_ENV === "DEVELOPMENT") {
        console.log(`Database connection Successfull`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connectDB;
