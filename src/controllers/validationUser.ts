import { Request, Response } from "express";
import userModel from "../models/userSchema";
const validationUser = async(req: Request, res: Response) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    
    const userIp = ipAddress?.toString()
    try {
        const { username, email, ip } = (req as any).user
       const user = await userModel.findOne({username, email})
       
       console.log('user validation ip', ip, userIp)
       if(!user || ip !== userIp) return res.status(401).send({message: 'User not found'})

       res.send({name: user?.name, email: user?.email, photoUrl: user?.photoUrl, username: username, isActive: user?.isActive, _id: user._id})
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export default validationUser;