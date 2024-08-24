import {Request, Response} from 'express'
import userModel from '../models/userSchema'
import generateJwt from './generateJwt'
const createUser = async(req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { name, username, email, photoUrl, password } = req.body
        const user = new userModel({ name, username, email, photoUrl, password })
        const result = await user.save()
        console.log(result)
        const token = await generateJwt(username, email)
        res.status(201).send({token, name, username, email, photoUrl})
    } catch (error:any) {
        res.status(500).send({ error: error.message })
    }
    
}

export default createUser