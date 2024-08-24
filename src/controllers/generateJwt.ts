import jwt from 'jsonwebtoken'
const generateJwt = async (username:string, email:string) => {
    const token = await jwt.sign({ username, email }, process.env.jwt_secret as string, { expiresIn: '7d' })
    return token
}

export default generateJwt