import express from "express"
import { Exception } from "../utils/Exception.js"
import { BookmarkController } from "../controllers/BookmarkController.js"
import { Middlewares } from "../middlewares/Middlewares.js"

export const bookmarkRouter = express.Router()

bookmarkRouter.route( "/" ).get( Middlewares.auth, BookmarkController.allBookmarks ).all( Exception.methodNotAllowedException )
bookmarkRouter.route( "/add/:id" ).get( Middlewares.auth, BookmarkController.addBookmark ).all( Exception.methodNotAllowedException )
bookmarkRouter.route( "/remove/:id" ).get( Middlewares.auth, BookmarkController.removeBookmark ).all( Exception.methodNotAllowedException )
