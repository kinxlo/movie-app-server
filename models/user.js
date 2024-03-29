import mongoose from "mongoose"

const userSchema = new mongoose.Schema( {
    email:{
        type:String,
        unique:true,
        required:true,
        match:[
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Please Provide a valid email",
        ],
    },

    password:{
        type:String,
        required:true,
    },
} )

export const USER = mongoose.model( "User", userSchema )

