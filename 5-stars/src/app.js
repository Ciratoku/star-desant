import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Servers running on ${PORT} port`);
});
