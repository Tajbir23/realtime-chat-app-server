import { Request, Response, Router } from "express";
import createUser from "../controllers/createUser";
import verifyJwt from "../controllers/verifyJwt";
import validationUser from "../controllers/validationUser";
import loginUser from "../controllers/loginUser";

import getAllUsers from "../controllers/getAllUsers";
import findOne from "../controllers/findUser";
import postMessage from "../controllers/message/postMessage";



const router = Router();

router.post('/signup',createUser)

router.get('/user_validation', verifyJwt, validationUser)

router.post('/login', loginUser)


router.get('/users',verifyJwt, async(req:Request, res: Response) => {
    const {email, username} = (req as any).user
    try {
        const users = await getAllUsers(email)
        res.send(users)
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/user/:id', verifyJwt, findOne)

router.post('/message', verifyJwt, postMessage)

export default router;