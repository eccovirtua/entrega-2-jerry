import express from "express"
import morgan from "morgan"
import cors from 'cors'
import router from './routes/authRutas.js'
import prodRutas from './routes/prodRutas.js'
import authRutas from './routes/authRutas.js'



const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(morgan("dev"))
app.use(express.json())
app.use('/api',router)
app.use(authRutas)
app.use('/api',prodRutas)

export default app
