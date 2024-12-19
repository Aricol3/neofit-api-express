import express from "express";
import * as mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/neofit")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.get("/", (req, res) => {
    res.json({ message: "Hello Neofit!" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
