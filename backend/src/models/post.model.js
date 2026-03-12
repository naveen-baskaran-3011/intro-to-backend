import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        minimum: 1,
        maximum: 150
    }
}, {
    timestamps: true
})

export const Post = mongoose.model('Post', postSchema);
