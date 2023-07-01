const express = require('express');
const app = express();

require('dotenv').config();

const routes = require('./src/routes');
app.use('/',routes);


const PORT = 8300;
app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`)
})