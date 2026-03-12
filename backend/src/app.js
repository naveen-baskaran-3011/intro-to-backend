import express from 'express';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(express.json()); // parse incoming JSON data

app.get("/", (req, res) => {
    console.log("Welcome to the backend");
    res.status(200).json({ message: 'Welcome to the backend' });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;