const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./src/routes');
const cors = require('cors');

const app = express();
require('dotenv').config();

// app.use(cors({
//     origin: ['http://localhost:3000/']
// }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // const allowedOrigins = ['http://localhost:3000', 'http://gamebrag.onrender.com', 'https://gamebrag.onrender.com'];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //      res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
  });

app.use(bodyParser.json());
app.use('/',routes);


const PORT = 8300;
app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`)
})