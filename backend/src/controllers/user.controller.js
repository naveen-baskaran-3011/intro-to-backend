import { User } from "../models/user.model.js";

const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // if User exist in the system
        const existing = await User.findOne({ email: email.toLowerCase() });
        if(existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({ message: 'User created successfully', user: {
            id: user._id,
            email: user.email,
            username: user.username
        } });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

const loginUser = async(req, res) => {
    try {
        // check for user existence
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', user: {
            id: user._id,
            email: user.email,
            username: user.username
        } });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

const logoutUser = async(req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Logout successful' });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}