import express from "express"
import UserController from "../controller/UserController"
import UserBusiness from "../business/UserBusiness"
import UserDatabase from "../database/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { TokenManager } from "../services/TokenManager"

const userRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new HashManager(),
    new TokenManager()
  )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)

export default userRouter