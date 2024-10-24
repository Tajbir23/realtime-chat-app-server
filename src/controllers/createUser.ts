import {Request, Response} from 'express'
import userModel from '../models/userSchema'
import generateJwt from './generateJwt'
import { io } from '..'
import findOneUser from './findUser'
import { v4 as uuidv4 } from 'uuid';
const createUser = async(req: Request, res: Response) => {
    // const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    
    // const ip = ipAddress?.toString()

    const uid = uuidv4()
    try {
        const { name, username, email, photoUrl, password } = req.body
        // const user = new userModel({ name, username, email, photoUrl, password, ip })
        const user = new userModel({ name, username, email, photoUrl, password })
        const result = await user.save()
        
        // const token = await generateJwt(username, email, user._id, user.ip);
        const token = await generateJwt(username, email, user._id);

        const allUsers = await findOneUser(result._id);
        io.emit('users', allUsers)
        res.status(201).send({token, name, username, email, photoUrl, _id: user._id, uid})
    } catch (error:any) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
    
}

export default createUser