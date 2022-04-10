const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
const mongoose = require('mongoose');
const movieRouter = require('./routes/movieRoutes');
app.use(morgan('combined'));
app.use(express.json());
// LOCAL TEST
mongoose.connect('mongodb://db:27017/movies-guru',{useNewUrlParser: true, useUnifiedTopology: true}).
then().catch(err=>console.log(err));
mongoose.connection.once('open', ()=>console.log('it works fine'));

// DEV

/* mongoose.connect('mongodb://db:27017/movies-guru',{useNewUrlParser: true, useUnifiedTopology: true}).
then().catch(err=>console.log(err));
mongoose.connection.once('open', ()=>console.log('it works fine')); */

movieRouter(app);


app.listen(8081, ()=>console.log('server is on at port 8080'));

module.exports = app;