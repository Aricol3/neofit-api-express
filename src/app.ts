import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import foodRoutes from "./routes/foodRoutes";
import "./config/passport.ts"
import authRoutes from "./routes/authRoutes.ts";

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/neofit")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/food", foodRoutes);
app.use("/auth", authRoutes);

app.get("/", (_, res) => {
    res.json({ message: "Hello Neofit!" })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
