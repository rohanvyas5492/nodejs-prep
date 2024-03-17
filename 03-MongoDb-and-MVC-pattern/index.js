const express = require("express");
const {connectMongoDb} = require("./connection");
const userRoute = require("./routes/user");
const app = express();

const PORT = 8000;
//Connection
connectMongoDb('mongodb://127.0.0.1:27017/users')
.then(()=>console.log("MongoDb connected successfully"))
.catch((err)=>console.log("Error: ",err));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/users",userRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));