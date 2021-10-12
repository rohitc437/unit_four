const path = require('path')
const express = require("express");
const userController=require("./controllers/user.controller");

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use("/users",userController)


module.exports=app;
