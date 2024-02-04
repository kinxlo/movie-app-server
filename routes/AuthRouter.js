import express from "express"
import { AuthController } from "../controllers/AuthController.js"
import { Exception } from "../utils/Exception.js"
import { Middlewares } from "../middlewares/Middlewares.js"

export const authRouter = express.Router()

authRouter.route( "/register" ).post( AuthController.register ).all( Exception.methodNotAllowedException )
authRouter.route( "/login" ).post( AuthController.login ).all( Exception.methodNotAllowedException )
authRouter.route( "/user" ).get( Middlewares.auth, AuthController.getUser ).all( Exception.methodNotAllowedException )
