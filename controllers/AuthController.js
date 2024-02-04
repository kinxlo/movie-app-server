import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Exception } from "../utils/Exception.js"
import { USER } from "../models/user.js"


export class AuthController {
    constructor () {
    }

    static async register ( req, res, next ) {
        const { email, password, repeatPassword } = req.body

        if ( !email || !password ) {
            return next( Exception.showGenericException( "Please provide both email and password", 400 ) )
        }

        if ( password !== repeatPassword ) {
            return next( Exception.showGenericException( "Password mismatch", 400 ) )
        }

        try {

            const hashedPassword = await AuthController.hashPassword( password )
            const user = await USER.create( { email, password:hashedPassword } )
            const token = AuthController.generateToken( user._id )
            return res.status( 200 ).json( { id:user._id, token } )

        } catch ( error ) {
            // res.status( 500 ).json( { error:error.message } )
            return next( Exception.showGenericException( error.message, 500 ) )
        }
    }

    static async login ( req, res, next ) {
        const { email, password } = req.body

        if ( !email || !password ) {
            return next( Exception.showGenericException( "Please provide both email and password", 400 ) )
        }

        try {
            const user = await USER.findOne( { email } )

            if ( !user ) {
                return next( Exception.showGenericException( "User does not exist", 400 ) )
            }

            const isPasswordMatch = await AuthController.comparePassword( password, user.password )

            if ( !isPasswordMatch ) {
                return next( Exception.showGenericException( "Wrong password", 401 ) )
            }

            const token = AuthController.generateToken( user._id )

            res.status( 200 ).json( { token, id:user._id } )
        } catch ( error ) {
            next( Exception.showGenericException( "Something went wrong", 500 ) )
        }
    }

    static getUser ( req, res, next ) {
        const { userId } = req.user
        res.status( 200 ).json( { id:userId } )
    }

    static async hashPassword ( password ) {
        const salt = await bcrypt.genSalt( 10 )
        return bcrypt.hash( password, salt )
    }

    static async comparePassword ( plainPassword, hashedPassword ) {
        return bcrypt.compare( plainPassword, hashedPassword )
    }

    static generateToken ( userId ) {
        return jwt.sign( { userId }, process.env.JWT_SECRET, { expiresIn:"3d" } )
    }

    // static handleRegistrationError ( error, next ) {
    //     if ( error.code === 11000 && error.keyValue.email ) {
    //         return next( Exception.showGenericException( "Email already exists", 400 ) )
    //     }
    //     if ( error.errors.email?.message ) {
    //         return next( Exception.showGenericException( error.errors.email.message, 400 ) )
    //     }
    //     next( Exception.showGenericException( "Something went wrong", 500 ) )
    // }
}
