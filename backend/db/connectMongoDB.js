import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to mongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Failed to connect to mongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
