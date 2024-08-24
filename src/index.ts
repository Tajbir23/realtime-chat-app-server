import dotenv from 'dotenv'
dotenv.config()
import express, {Request, Response} from "express"
import connection from "./config/db"
import router from './router/routes'
import cors from 'cors'


const port = process.env.PORT || 3000

const app = express()

app.use(cors({
    origin: '*'
}))
app.use(express.json())

connection()

app.get('/', async(req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.use('/api', router)


app.listen(port, async() => {
    console.log('Server is running on port 3000')
})