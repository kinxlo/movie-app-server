import { MOVIE } from "../models/movies.js"


export class MovieController {
    constructor () {
    }

    static async allData ( req, res ) {
        try {
            const data = await MOVIE.find( {} )
            res.status( 200 ).json( { data } )
        } catch ( error ) {
            res.status( 500 ).json( { error:error.message } )
        }
    }

    static async getAllMovies ( req, res ) {
        try {
            const movies = await MOVIE.find( { type:"movie" } )
            res.status( 200 ).json( { data:movies } )
        } catch ( error ) {
            res.status( 500 ).json( { error:error.message } )
        }
    }

    static async getAllSeries ( req, res ) {
        try {
            const series = await MOVIE.find( { type:`series` } )
            res.status( 200 ).json( { data:series } )
        } catch ( error ) {
            res.status( 500 ).json( { error:error.message } )
        }
    }
}