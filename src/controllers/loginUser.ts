import { Request, Response } from "express";
import userModel from "../models/userSchema";
import generateJwt from "./generateJwt";

const loginUser = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({email, password});
        
    if(!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = await generateJwt(user.username, user.email, user._id)
    res.send({token, username: user.username, email: user.email, photoUrl: user.photoUrl, name: user.name, _id: user._id});
    } catch (error) {
        res.send(error)
    }
}

export default loginUser;