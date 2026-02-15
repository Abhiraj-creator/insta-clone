/*
app.js creates the server and configure it 

*/
//requires
const express=require('express');
const app=express();
const authRouter=require('./routes/auth.routes');
const PostRouter=require('./routes/posts.routes')
const cookieParser=require('cookie-parser');


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use('/api/posts',PostRouter);


module.exports=app;