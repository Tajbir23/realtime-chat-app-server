import { Request, Response } from "express";
import userModel from "../models/userSchema";
const validationUser = async(req: Request, res: Response) => {
    // const ipAddress = req.headers['cf-connecting-ip'] ||  
    // req.headers['x-real-ip'] ||
    // req.headers['x-forwarded-for'] ||
    // req.socket.remoteAddress || '';
    // const networkInterface = os.networkInterfaces()
    
    // console.log(networkInterface)

    // console.log(req.headers['x-real-ip'])
    // console.log(ipAddress)
    // const userIp = ipAddress?.toString()
    try {
        const { username, email } = (req as any).user
       const user = await userModel.findOne({username, email})
       
       
       if(!user) return res.status(401).send({message: 'User not found'})

       res.send({name: user?.name, email: user?.email, photoUrl: user?.photoUrl, username: username, isActive: user?.isActive, _id: user._id})
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export default validationUser;