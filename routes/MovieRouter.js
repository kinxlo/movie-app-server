import express from "express"
import { Exception } from "../utils/Exception.js"
import { MovieController } from "../controllers/MovieController.js"

export const movieRouter = express.Router()

movieRouter.route( "/" ).get( MovieController.allData ).all( Exception.methodNotAllowedException )
movieRouter.route( "/movies" ).get( MovieController.getAllMovies ).all( Exception.methodNotAllowedException )
movieRouter.route( "/series" ).get( MovieController.getAllSeries ).all( Exception.methodNotAllowedException )
