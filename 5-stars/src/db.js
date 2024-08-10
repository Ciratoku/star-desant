import mongoose from "mongoose";

const mongoDB =
  process.env.NODE_ENV == "test"
    ? process.env.DATABASE_TEST
    : process.env.DATABASE_DEV;
console.log(process.env.NODE_ENV);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
