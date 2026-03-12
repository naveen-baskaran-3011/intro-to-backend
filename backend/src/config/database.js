import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongoDB Connected !!! ${connectionInstance.connection.host}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

export default connectDB;