import mongoose from "mongoose"

const connection = async() => {
    try {
        await mongoose.connect(process.env.mongodb_uri || 'mongodb://localhost:27017')
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log('mongodb error', err)
    }
}

export default connection