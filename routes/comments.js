const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/user");
const Comment = require('../models/comment')


//create a comment
//
router.post("/create", async (req, res) => {
    const newComment = new Comment(req.body);
    const post = await Post.findById(req.body.postId);
    try {
        const savedComment = await newComment.save();
        await post.updateOne({ $push: { comments: savedComment.id } });
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});
