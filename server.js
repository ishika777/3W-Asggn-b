import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


import userRoutes from "./routes/user.routes.js"
import claimRoutes from "./routes/claim.routes.js"
import connectDb from "./utils/db.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/claim", claimRoutes);

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    connectDb()
    console.log(`🚀 Server running on port ${PORT}`);
});
