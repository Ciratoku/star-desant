import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
const PORT =
  process.env.NODE_ENV == "test" ? process.env.PORT_TEST : process.env.PORT_DEV;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Servers running on ${PORT} port`);
});

export default app;
