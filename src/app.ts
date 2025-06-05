import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import foodRoutes from "./routes/foodRoutes";

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/neofit")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
app.use(cors());

app.use("/food", foodRoutes);

app.get("/", (_, res) => {
    res.json({ message: "Hello Neofit!" })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
