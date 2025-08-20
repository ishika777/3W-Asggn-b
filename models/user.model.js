import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    totalPoints: { type: Number, default: 10 }
});

const User = mongoose.model("User", userSchema);
export default User;
