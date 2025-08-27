import express from "express";
import "dotenv/config";
import dbConnection from "./config/dbConnection.js";
import router from "./routes/routes.js";
import helmet from "helmet";
import cors from "cors";

dbConnection();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(router);

app.get("/", (req, res) => {
  res.send("server is running ");
});

// app.listen(port, () => {
//   console.log(`server is running on => ${port}`);
// });
export default app;