import { Request, Response, Router } from "express";
import createUser from "../controllers/createUser";
import verifyJwt from "../controllers/verifyJwt";
import validationUser from "../controllers/validationUser";
import loginUser from "../controllers/loginUser";

import getAllUsers from "../controllers/getAllUsers";
import postMessage from "../controllers/message/postMessage";
import getMessage from "../controllers/message/getMessage";
import userModel from "../models/userSchema";
import mongoose from "mongoose";
import getFriends from "../controllers/friends/getFriends";
import searchUsers from "../controllers/search";
import findOneUser from "../controllers/findUser";
import blockFriend from "../controllers/friends/blockFriend";
import postMyDay from "../controllers/Day/postMyDay";
import postLike from "../controllers/Day/postLike";
import getTotalLikeAndComments from "../controllers/Day/getTotalLikeAndComments";
import postComment from "../controllers/Day/postComment";
import getComments from "../controllers/Day/getComments";
import shareMyDay from "../controllers/Day/shareMyDay";
import shareCountMyDay from "../controllers/Day/shareCountMyDay";



const router = Router();

router.post('/signup',createUser)

router.get('/user_validation', verifyJwt, validationUser)

router.post('/login', loginUser)


router.get('/users',verifyJwt, async(req:Request, res: Response) => {
    const {email, username} = (req as any).user
    const {page} = req.query;
    try {
        const users = await getAllUsers(page as string ?? 1)
        
        res.send(users)
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/user/:id', verifyJwt, async(req: Request, res: Response) => {
    const {id} = req.params
    try {
        const user = await findOneUser(id)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.send(user)
    } catch (error) {
        res.status(404).json({message: "user not found" })
    }
})

router.post('/message', verifyJwt, postMessage)

router.get('/message/:id', verifyJwt, async(req:Request, res: Response) => {
    const {id} = req.params
    const {username} = (req as any).user
    const {currentPage = 1} = (req as any).query
    console.log(id, currentPage)
    try {
        const skip = (Number(currentPage - 1) * 10)
        
        const isValidId = await mongoose.Types.ObjectId.isValid(id)

        if(!isValidId){
            return res.status(404).json({message: 'User not found'})
        }
        userModel.findOne({_id: id}).then(async(user) => {
            const receiverUsername = user?.username ?? ''
            const message = await getMessage(username, receiverUsername, skip)
            res.send(message)
        })
        
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/friends', verifyJwt, getFriends)

router.get('/search/:search', verifyJwt, async (req, res) => {
    const {search} = req.params
    const {email} = req.query
    const result = await searchUsers(search, email as string)
    res.send(result)
})

router.post('/friend/block/:chatId',verifyJwt, async (req : Request, res : Response) => {
    const {_id} = (req as any).user
    const {chatId} = req.params
    const {blockUserId, isBlock} = (req as Request).body
    await blockFriend(_id, chatId, blockUserId, isBlock)
})

router.post('/create_my_day', verifyJwt, postMyDay)

router.post('/like', verifyJwt, postLike)

router.post('/total_like_and_comments', verifyJwt, getTotalLikeAndComments)

router.post('/comment', verifyJwt, postComment)

router.get('/comments/:myDayId', getComments)

router.get('/share/:id', shareMyDay)

router.post('/share', shareCountMyDay)

export default router;