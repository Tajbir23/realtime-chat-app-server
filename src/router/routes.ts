import { Request, Response, Router } from "express";
import createUser from "../controllers/createUser";
import verifyJwt from "../controllers/verifyJwt";
import validationUser from "../controllers/validationUser";
import loginUser from "../controllers/loginUser";

import getAllUsers from "../controllers/getAllUsers";
import findOne from "../controllers/findUser";
import postMessage from "../controllers/message/postMessage";
import getMessage from "../controllers/message/getMessage";
import userModel from "../models/userSchema";
import mongoose from "mongoose";
import getFriends from "../controllers/friends/getFriends";



const router = Router();

router.post('/signup',createUser)

router.get('/user_validation', verifyJwt, validationUser)

router.post('/login', loginUser)


router.get('/users',verifyJwt, async(req:Request, res: Response) => {
    const {email, username} = (req as any).user
    console.log("route called",username)
    try {
        const users = await getAllUsers()
        res.send(users)
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/user/:id', verifyJwt, findOne)

router.post('/message', verifyJwt, postMessage)

router.get('/message/:id', verifyJwt, async(req:Request, res: Response) => {
    const {id} = req.params
    const {username} = (req as any).user
    const {currentPage = 1} = (req as any).query
    try {
        const skip = (Number(currentPage - 1) * 10)
        
        const isValidId = await mongoose.Types.ObjectId.isValid(id)

        if(!isValidId){
            return res.status(404).json({message: 'User not found'})
        }
        userModel.findOne({_id: id}).then(async(user) => {
            const receiverUsername = user?.username ?? ''
            console.log(receiverUsername, username)
            const message = await getMessage(username, receiverUsername, skip)
            res.send(message)
        })
        
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/friends', verifyJwt, getFriends)

export default router;