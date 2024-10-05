import jwt from 'jsonwebtoken'
const generateJwt = async (username:string, email:string, _id?:string, ip: string = '127.0.0.1') => {
    const token = await jwt.sign({ username, email, _id, ip }, process.env.jwt_secret as string, { expiresIn: '7d' })
    return token
}

export default generateJwt