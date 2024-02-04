import { config } from "dotenv"
import { Server } from "./services/Server.js"
import { Middlewares } from "./middlewares/Middlewares.js"
import { authRouter } from "./routes/AuthRouter.js"
import { movieRouter } from "./routes/MovieRouter.js"
import { bookmarkRouter } from "./routes/BookmarkRouter.js"
import { MOVIE } from "./models/movies.js"
import { movieData } from "./data.js"


config()

const server = new Server( process.env.PORT || 3000 )

server.app.use( "/api/auth", authRouter )
server.app.use( "/api/movie", movieRouter )
server.app.use( "/api/bookmark", bookmarkRouter )
server.app.use( Middlewares.error )

server.initializeExpress().then( ( res ) => {
    console.log( res )
    server.seedMovieTable( MOVIE, movieData )
} )



