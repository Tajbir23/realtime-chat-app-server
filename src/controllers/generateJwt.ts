import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken'
const generateJwt = async (username:string, email:string, _id?:string,) => {
    const token = await jwt.sign({ username, email, _id }, process.env.jwt_secret as string, { expiresIn: '7d' })
    return token
}

export default generateJwt