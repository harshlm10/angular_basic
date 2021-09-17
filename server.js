const express = require('express') // express server
const dotenv = require('dotenv') // manage environment variables
const morgan = require('morgan') 
const colors = require('colors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// load environmnet variables
dotenv.config({path : './config/config.env'});

// connect to DB
connectDB()

//Router Files
const events = require('./routes/events.js')

const app = express();

//Body Parser
app.use(express.json());

 // Dev logging Middleware
if(process.env.NODE_ENV === 'Development'){
    app.use(morgan('dev'));
}

//Mount Routers
app.use('/api/v1/events' , events)

app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT ,
console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
.yellow.bold)); 

// Handled Unhandled Promise Rejections.
process.on('unhandledRejection' , (err , promise)=> {
    console.log(`error : ${err.message}`.red.big)
    // close the server and exit the process
    server.close(()=>process.exit(1));
})





// const server = require('http').createServer(express())
// const { Server } = require('socket.io')
// const io = new Server(server)
