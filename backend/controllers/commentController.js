const db = require('../models/commentModels');

async function getAllCommentsByBlogId(req, res, next) {
    const id = req.validatedId;
    try {
        const comments = await db.getAllCommentsByBlogId(id);

        // if (!comments || comments.length === 0) {
        //     const error = new Error ('Failed to Fetch Comments');
        //     error.status = 404;
        //     return next(error)
        // };

        res.json(comments)
    } catch(err) {
        next(err)
    };
};

async function getComment(req, res, next) {
    const id = req.validatedId;

    try {
        const comment = await db.getCommentById(id);

        if (!comment) {
            const error = new Error ('Failed to Fetch Comment');
            error.status = 404;
            return next(error)
        };

        res.json(comment);
    } catch(err) {
        next(err)
    };
};

async function createComment(req, res, next) {
    const postId = req.validatedId;
    const authorId = req.user.id;

    try {
        const { text } = req.body;
        const newComment = await db.createNewComment(text, authorId, postId);

        res.status(200).json(newComment);
    } catch(err) {
        next(err);
    };
};

async function updateComment(req, res, next) {
    const id = req.validatedId;

    try {
        const { text } = req.body;
        const updatedComment = await db.updateCommentById(text, id);

        res.status(200).json(updatedComment);
    } catch(err) {
        next(err);
    };
};

async function deleteComment(req, res, next) {
    const id = req.validatedId;

    try {
        const deletedComment = await db.deleteCommentById(id);

        res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getAllCommentsByBlogId,
    getComment,
    createComment,
    updateComment,
    deleteComment,
};