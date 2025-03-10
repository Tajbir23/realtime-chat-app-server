import { model, Schema } from 'mongoose'
import user from '../interface/userInterface'
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = new Schema<user>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, 'username must be provided'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        unique: true,
    },
    photoUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        minlength: 8,
        maxlength: 200
    },
    lastActive: {
        type: Number,
        default: Number(Date.now())
    },
    isActive: {
        type: Boolean,
    },
    myDay: {
        type: String
    },
    myDayEndAt: {
        type: Number
    },
    isActiveMyDay: {
        type: Boolean,
    },
    myDayId : {
        type: String
    },
    ip: {
        type: String
    }
})

userSchema.plugin(uniqueValidator, { message: '{PATH} to be unique.' })

const userModel = model<user>('Users', userSchema)
export default userModel