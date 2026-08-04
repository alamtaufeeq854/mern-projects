import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB SUCCESSFULLY CONNECTED !");
  } catch (error) {
    console.log("FAILED TO CONNECT WITH MONGODB !", error);
    process.exit(1); // Exit on Failure
  }
};
