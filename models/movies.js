import mongoose from "mongoose"

const movieSchema = mongoose.Schema( {
    title:{
        type:String,
        required:true,
    },

    year:{
        type:String,
        required:true,
    },

    rated:{
        type:String,
        required:true,
    },

    type:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },

    bookmarkBy:{
        type:[
            {
                type:mongoose.Types.ObjectId,
                ref:"User",
            },
        ],
    },
} )

export const MOVIE = mongoose.model( "Movie", movieSchema )