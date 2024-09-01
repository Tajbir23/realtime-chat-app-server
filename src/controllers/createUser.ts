import {Request, Response} from 'express'
import userModel from '../models/userSchema'
import generateJwt from './generateJwt'
import getAllUsers from './getAllUsers'
import { io } from '..'
const createUser = async(req: Request, res: Response) => {
    try {
        const { name, username, email, photoUrl, password } = req.body
        const user = new userModel({ name, username, email, photoUrl, password })
        const result = await user.save()
        
        const token = await generateJwt(username, email, user._id);

        const allUsers = await getAllUsers(result.email);
        io.emit('users', allUsers)
        res.status(201).send({token, name, username, email, photoUrl})
    } catch (error:any) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
    
}

export default createUser