import {Request, Response} from 'express'
import userModel from '../models/userSchema'
import generateJwt from './generateJwt'
import getAllUsers from './getAllUsers'
import { io } from '..'
const createUser = async(req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { name, username, email, photoUrl, password } = req.body
        const user = new userModel({ name, username, email, photoUrl, password })
        const result = await user.save()
        console.log(result)
        const token = await generateJwt(username, email);

        const allUsers = await getAllUsers();
        io.emit('users', allUsers)
        res.status(201).send({token, name, username, email, photoUrl})
    } catch (error:any) {
        res.status(500).send({ error: error.message })
    }
    
}

export default createUser