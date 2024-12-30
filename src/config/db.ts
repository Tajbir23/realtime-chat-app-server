import mongoose from "mongoose"

const connection = async() => {
    try {
        await mongoose.connect(process.env.mongodb_uri || 'mongodb://localhost:27017')
        // await mongoose.connect('mongodb+srv://realtimeChat:realtimeChat@cluster0.sdyx3bs.mongodb.net/realtimeChat?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log('mongodb error', err)
    }
}

export default connection