import express, { json } from 'express';
import { connect } from 'mongoose';

const app = express();  // adds middleware to parse JSON bodies
const mongo_url = process.env.MONGO_URL || 'mongodb://mongo:27017/mydb';
app.use(json());
const mongoConnect = async () => {
    try {
        await connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');       
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
mongoConnect();

app.get("/",(req,res)=>{
    res.json("Hello from the backend!");
});
app.get("/api/hello",(req,res)=>{
    res.json("Hello from the backend! with MongoDb");
});
app.listen(5000,()=>{
    console.log("Backend server is running on port 5000");
})