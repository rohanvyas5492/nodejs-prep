const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const {handleGetBlogAndComments,handleCreateBlog,handleCreateComment} = require("../controllers/blog");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
})

const upload = multer({ storage: storage })

router.get("/add-blog",(req,res)=>{
    return res.render('createBlog',{user:req.user,})
});

router.get('/:id',handleGetBlogAndComments);

router.post("/",upload.single('coverImg'),handleCreateBlog);

router.post("/comment/:id",handleCreateComment);

module.exports = router;