import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "restapinext14",
      bufferCommands: false,
    });
    const connection = mongoose.connection;

    // Events on 'connection' using 'on'
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Error connecting to MongoDB");
      console.log("Error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
