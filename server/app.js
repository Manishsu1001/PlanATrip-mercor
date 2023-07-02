const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./src/routes');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/',routes);


const PORT = 8300;
app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`)
})