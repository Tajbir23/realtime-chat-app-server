import { Request, Response, Router } from "express";
import createUser from "../controllers/createUser";
import verifyJwt from "../controllers/verifyJwt";
import validationUser from "../controllers/validationUser";
import loginUser from "../controllers/loginUser";

import getAllUsers from "../controllers/getAllUsers";
import { io } from "..";

const router = Router();

router.post('/signup',createUser)

router.get('/user_validation', verifyJwt, validationUser)

router.post('/login', loginUser)

// const allUsers = getAllUsers();
// io.emit('allUsers', allUsers)

router.get('/users',verifyJwt, async(req:Request, res: Response) => {
    try {
        const users = await getAllUsers()
        res.send(users)
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
})

export default router;