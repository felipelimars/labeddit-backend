import express from 'express'
import dotenv from 'dotenv'
import userRouter from './router/userRouter'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.use("/users", userRouter)