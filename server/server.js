const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config();
const schema = require('./shemas/shema')

const PORT = 4000;

const app = express();
//Allow access to this server's ressources by an another server
app.use(cors())

app.use('/graphql',graphqlHTTP({
    graphiql: true,
    schema:schema
}));

//Connection database mongo
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString)
const database = mongoose.connection;
database.on('error', (error)=> {
    console.log(error);
});

database.once('connected', ()=> {
    console.log("Database connected");
})

//Listen to the port 400
app.listen(PORT,()=>{
    console.log("Running on port 4000")
});