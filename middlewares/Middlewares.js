import { Exception } from "../utils/Exception.js"
import jwt from "jsonwebtoken"

export class Middlewares {
    constructor () {
    }

    static error ( err, req, res, next ) {
        res.status( err.status ).json( {
            message:err.message,
        } )
    }

    static auth ( req, res, next ) {
        const authHeader = req.headers.authorization

        if ( !authHeader || !authHeader.startsWith( "Bearer" ) ) {
            return next( Exception.showGenericException( "No Token Provided", 401 ) )
        }

        const token = req.headers.authorization.split( " " )[1]

        try {
            const payload = jwt.verify( token, process.env.JWT_SECRET )
            req.user = { userId:payload.userId }
            next()
        } catch ( e ) {
            return next( Exception.showGenericException( "Unauthorized", 401 ) )
        }
    }
}
