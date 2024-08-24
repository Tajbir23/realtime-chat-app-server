import { Router } from "express";
import createUser from "../controllers/createUser";
import verifyJwt from "../controllers/verifyJwt";
import validationUser from "../controllers/validationUser";

const router = Router();

router.post('/signup',createUser)

router.get('/user_validation', verifyJwt, validationUser)

export default router;