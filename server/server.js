import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

//initialize


const app = express()

//connect db
await connectDB()

//middlewares

app.use(cors())

//routes

app.get('/',(req,res)=>res.send("Api Working"))
app.post('/clerk',express.json(),clerkWebhooks)

//port

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})