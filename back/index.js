import express, { json } from 'express';
import { connect } from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();  // adds middleware to parse JSON bodies
const mongo_url = process.env.MONGO_URL;
const jwtKey = process.env.JWT_KEY;
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

// Middleware to verify JWT

const user = {
    id: 1,
    username: "test",
    password: "test123",
};

function authVerify(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Token required' });
        jwt.verify(token, jwtKey, (err,user) => {
            if (err){
                if(err.name==='TokenExpiredError')
                    return res.status(403).json({ error: 'Token expired' });
                return res.sendStatus(403).json({ error: 'Invalid token' });
            } 
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        const token = jwt.sign({ id: user.id, username: user.username }, jwtKey, { expiresIn: '1h' })
        return res.json({ token });
    }
    return res.status(401).json({ error: "Invalid credentials" });
})
app.get('/api/secure', authVerify, (req, res) => {
    res.json({ msg: `Welcome ${req.user.username}!!!` });
})

app.get("/", (req, res) => {
    res.json("Hello from the backend!");
});
app.get("/api/hello", (req, res) => {
    res.json("Hello from the backend! with MongoDb");
});
app.listen(5000, () => {
    console.log("Backend server is running on port 5000");
})