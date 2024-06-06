import mongoose from "mongoose"

let isConnected = false // track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)

  if (isConnected) {
    console.log("MongoDB is already connected")
  }

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    })

    isConnected = true

    console.log("MongoDB connected")
  } catch (error) {
    console.log(error)
  }
}
