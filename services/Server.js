import express from "express"
import cors from "cors"
import mongoose from "mongoose"

export class Server {
    constructor ( port ) {
        this.app = express()
        this.port = port
        this.clientOptions = { useNewUrlParser:true, useUnifiedTopology:true }
        this.app.use( cors() ).use( express.json() )
    }

    async initializeExpress () {
        try {
            // await mongoose.connection.db.admin().command({ ping: 1 });
            this.app.listen( this.port, () => {
                console.log( `Server is listening on PORT:${ this.port }`, this.clientOptions )
            } )
            await mongoose.connect( process.env.MONGODB_URI )
            return "DB Connected"
        } catch ( error ) {
            return { "Unable to connect":error }
        }
        // finally {
        //     await mongoose.disconnect()
        // }
    }

    async seedMovieTable ( model, data ) {
        try {
            await model.deleteMany()
            console.log( "Previous ones deleted" )
            await model.create( data )
            console.log( "Uploading....." )
            console.log( "Movie Uploaded Successfully" )
            //breaks the terminal when it is done
            // process.exit( 0 )
        } catch ( error ) {
            console.log( error )
            console.log( "Unable to Connect" )
            process.exit( 1 )
        }
    }
}
