import { Post } from "../models/post.model.js";

const createPost = async(req, res) => {
    try {
        const { name, description, age } = req.body;

        if(!name || !description || !age) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const post = await Post.create({
            name,
            description,
            age
        });

        res.status(201).json({ message: 'Post created successfully', post });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

const getPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ post });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

const updatePost = async(req, res) => {
    try {
        const { name, description, age } = req.body;

        const post = await Post.findByIdAndUpdate(req.params.id, { name, description, age }, { new: true });
        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

const deletePost = async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully', post });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server error', error: err.message });
    }
}

export { createPost, getPost, getAllPosts, updatePost, deletePost };