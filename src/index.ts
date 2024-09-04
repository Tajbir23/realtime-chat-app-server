import dotenv from 'dotenv'
dotenv.config()
import express, {Request, Response} from "express"
import connection from "./config/db"
import router from './router/routes'
import cors from 'cors'
import { createServer } from 'node:http'
import {Server} from 'socket.io'
import userModel from './models/userSchema'
import getAllUsers from './controllers/getAllUsers'


const port = process.env.PORT || 3000

const app = express()
const server = createServer(app)

export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    }
})

app.use(cors({
    origin: ['http://localhost:5173'],
}))

app.use(express.json())

connection()

app.get('/', async(req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.use('/api', router)

const users = new Map<string, string>()
io.on('connection', (socket) => {
    
    socket.on('connected', async(email) => {
        users.set(socket.id, email)
        const update = await userModel.updateOne({email: email}, {$set: {isActive: true}})
        console.log("connected", email)
        const updatedUser = await getAllUsers(email)
        io.emit('users', updatedUser)
        
    })

    socket.on('logout', async() => {
        const email: any = users.get(socket.id)
        if(email){
            const update = await userModel.updateOne({email: email},{isActive: false, lastActive: Number(Date.now())});
            const updatedUser = await getAllUsers(email);
            io.emit('users', updatedUser);
            users.delete(socket.id)
            socket.disconnect()
        }
    })
    socket.on('disconnect', async() => {
        const email: any = users.get(socket.id)
        if(email){

            const update = await userModel.updateOne({email: email}, {isActive: false, lastActive: Number(Date.now())});
            const allUsers = await getAllUsers(email);
            console.log('disconnect', email)
            io.emit('users', allUsers);
            users.delete(socket.id)
        }
    });

})

// export default server
server.listen(port, async() => {
    console.log('Server is running on port 3000')
})