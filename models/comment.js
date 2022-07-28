const mongoose = require("mongoose");

const CommentModel = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            max: 500,
        },
        likes: { // store ids of the users
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentModel);