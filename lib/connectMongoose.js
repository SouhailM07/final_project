import mongoose from "mongoose";

export default function connectMongoose() {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log("============================");
      console.log("DB is connected successfully");
      console.log("============================");
    })
    .catch((error) => {
      console.log({ message: error.message });
    });
}
