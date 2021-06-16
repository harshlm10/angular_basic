const express = require('express') // express server
const dotenv = require('dotenv') // manage environment variables
 // load environmnet variables

dotenv.config({path : './config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000

app.listen(PORT , console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));