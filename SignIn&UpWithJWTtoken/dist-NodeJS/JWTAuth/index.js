import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

//postMess
import postMess from './routes/postMess.js';


//MiddleWare
import bodyParser from 'body-parser';
import cors from 'cors';
app.use(cors());
app.use(bodyParser.json());

//Import route
import authRouter from './routes/auth.js';
import displayUserDetails from './routes/displayUser.js';
//Route middleware
app.use('/api/user', authRouter);
app.use('/api/display', displayUserDetails);
app.use('/api/posts', postMess);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });




//Mongoose
import mongoose from 'mongoose';

//Connect to DB 
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(3002);