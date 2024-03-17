const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");
const {connectToDb} = require("./connection");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

//Connect to mongo db
connectToDb("mongodb://127.0.0.1:27017/blog-app")
.then(()=>console.log('Mongo Db connected...'))
.catch((err)=>console.log(`Error: `,err));

//Configure EJS as templating enjine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

//Routes
app.use("/user",userRouter);
app.use("/blog",blogRouter);

app.get("/",async(req,res)=>{
    const allBlogs = await Blog.find({});
    res.render('homepage',{
        user:req.user,
        blogs:allBlogs,
    });
    console.log(allBlogs)
});

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));