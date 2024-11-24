import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToMongoDB } from "./db/mongoClient";
import serverRoutes from "./routes/serverRoutes";

const app = express();
const PORT = 3000;

connectToMongoDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", serverRoutes);

app.get("/", (req, res) => {
  res.send("Server Management API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});