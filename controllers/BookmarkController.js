import { MOVIE } from "../models/movies.js"
import { Exception } from "../utils/Exception.js"

export class BookmarkController {
    static async allBookmarks ( req, res ) {
        try {
            const { userId } = req.user
            const bookmark = await MOVIE.find( { bookmarkedBy:userId } )
            res.status( 200 ).json( {
                data:bookmark,
            } )
        } catch ( error ) {
            res.status( 500 ).json( { error:error.message } )
        }
    }

    static async addBookmark ( req, res, next ) {
        try {
            const { id } = req.params
            const { userId } = req.user
            const movie = await MOVIE.findOneAndUpdate(
                { _id:id },
                { $push:{ bookmarkedBy:userId } },
            )
            if ( !movie ) {
                return next( Exception.showGenericException( `No Movie with ID:${ id }`, 400 ) )
            }
            res.status( 200 ).json( {
                message:"Movie Bookmarked!",
            } )
        } catch ( error ) {
            res.status( 500 ).json( { error:error.message } )
        }
    }

    static async removeBookmark ( req, res, next ) {
        try {
            const { id } = req.params
            const { userId } = req.user
            const movie = await MOVIE.findOneAndUpdate(
                { _id:id },
                { $pull:{ bookmarkedBy:userId } },
            )
            if ( !movie ) {
                return next( Exception.showGenericException( `No Movie with ID:${ id }`, 400 ) )
            }
            res.status( 200 ).json( {
                message:"Bookmark Removed!",
            } )
        } catch ( error ) {
            res.status( 500 ).json( { error:error.message } )
        }
    }
}
