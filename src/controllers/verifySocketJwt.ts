import jwt, { JwtPayload } from 'jsonwebtoken'
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

interface userPayload {
    username: string,
    email: string,
}

interface AuthenticatedSocket extends Socket {
    user?: userPayload & JwtPayload;
}

const verifySocketJwt = async (socket: AuthenticatedSocket, next: (err?: ExtendedError) => void) => {
    const token = socket.handshake.auth.token
    
    if (!token) {
        return socket.disconnect(true)
    }
    
    try {
        jwt.verify(token, process.env.jwt_secret as string, (err: Error | null, decoded : JwtPayload | string | undefined) => {
            if (err) throw err;
            socket.user = decoded as userPayload & JwtPayload
            next()
        })
    } catch (err) {
        socket.disconnect(true)
    }
}

export default verifySocketJwt;