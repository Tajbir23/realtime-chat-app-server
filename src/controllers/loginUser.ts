import { Request, Response } from "express";
import userModel from "../models/userSchema";
import generateJwt from "./generateJwt";
import { v4 as uuidv4 } from 'uuid';
const loginUser = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    // const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    
    // const ip = ipAddress?.toString()

    const  uid = uuidv4()
    
    try {
        // const user = await userModel.findOneAndUpdate({email, password}, {ip: ip}).select('-password');
        const user = await userModel.findOne({email, password}).select('-password');
        console.log(user);
    if(!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    
    // const token = await generateJwt(user.username, user.email, user._id, user.ip)
    const token = await generateJwt(user.username, user.email, user._id)
    res.send({token, username: user.username, email: user.email, photoUrl: user.photoUrl, name: user.name, _id: user._id, uid});
    } catch (error) {
        res.send(error)
    }
}

export default loginUser;