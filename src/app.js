import express, { urlencoded } from 'express'
import cors from  'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import userRouter from './routes/user.route.js';
import cvRouter from './routes/cv.route.js'
import interviewRouter from './routes/interview.route.js'
import historyRouter from './routes/history.route.js'
import speechInterviewRouter from './routes/speech.interview.route.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/cv", cvRouter)
app.use("/api/v1/interview", interviewRouter)
app.use("/api/v1/history", historyRouter)
app.use("/api/v1/speech-interview", interviewRouter)
app.use("/api/v1/speech-interview", speechInterviewRouter)


export {app}