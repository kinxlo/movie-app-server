export class Exception {
    constructor ( message, status ) {
        this.message = message
        this.status = status
    }

    static showGenericException ( message, status ) {
        return new Exception( message, status )
    }

    static methodNotAllowedException ( req, res ) {
        res.status( 400 ).json( {
            message:`Method ${ req.method } is not allowed on ${ req.originalUrl }`,
        } )
    }
}
