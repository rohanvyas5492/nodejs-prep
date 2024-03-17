const Blog = require("../models/blog");
const Comment = require("../models/comment");

const handleGetBlogAndComments = async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');
    return res.render('blog',{
        user:req.user,
        blog:blog,
        comments,
    })
}

const handleCreateBlog = async(req,res)=>{
    const {title,body} = req.body;
    const blog = await Blog.create({
        title,
        blogContent:body,
        createdBy:req.user._id,
        coverImgUrl:`/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
}

const handleCreateComment = async(req,res)=>{
    const blogId = req.params.id;
    await Comment.create({
        comment:req.body.comment,
        blogId:blogId,
        createdBy:req.user._id,
    });

    return res.redirect(`/blog/${blogId}`);
}

module.exports = {
    handleGetBlogAndComments,
    handleCreateBlog,
    handleCreateComment,
}