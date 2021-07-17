require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

//Connect to DB
const connectDB = require('./config/mongoDB');
connectDB();

//middleware with 2 servers
app.use(cors({creadentials: true, origin: 'http://localhost:3000'}));

//middleware for post request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(`/api`, require('./routes/product.routes'))

app.listen(PORT, ()=>{
    console.log(`1 : Server Locked and Loaded at PORT: ${PORT}`)
})
