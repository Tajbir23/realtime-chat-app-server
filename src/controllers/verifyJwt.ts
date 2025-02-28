import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    
    console.log("verifyJwt")
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' })
    }
    try {
        jwt.verify(token, process.env.jwt_secret as string, (err, decoded) => {
            if (err) throw err;
            (req as any).user = decoded
            next()
        })

    } catch (error:any) {
        console.log(error.message)
        res.status(401).send({ error: 'Unauthorized' })
    }
}

export default verifyJwt;
