require('dotenv').config();
/*
server.js starts the server and connects to db
*/

const app=require('./src/app');
const ConnectToDb=require('./src/config/database');

ConnectToDb();
// connection to db

app.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${process.env.PORT}`);
})