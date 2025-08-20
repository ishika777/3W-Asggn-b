import mongoose from "mongoose";

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("✅ MongoDB Connected"))
      .catch(err => console.log("❌ MongoDB Error:", err));
}

export default connectDb;
