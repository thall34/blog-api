const db = require('../models/postModels');

async function getAllPosts(req, res, next) {
    try {
        const posts = await db.getAllPosts();

        // React frontend will handle this by having an on screen message
        // if (posts.length === 0) {
        //     const error = new Error ('No Posts Found');
        //     error.status = 404;
        //     return next(error)
        // };

        res.status(200).json(posts);
    } catch(err) {
        next(err)
    };
};

async function getPost(req, res, next) {
    const id = req.validatedId;

    try {
        const post = await db.getPostById(id);

        if (!post) {
            const error = new Error ('Failed to Fetch Post');
            error.status = 404;
            return next(error)
        };

        res.status(200).json(post);
    } catch(err) {
        next(err)
    };
};

async function createPost(req, res, next) {
    const authorId = req.user.id;

    try {
        const { title, text } = req.body;
        const newPost = await db.createNewPost(title, text, authorId);

        res.status(200).json(newPost);
    } catch(err) {
        next(err);
    };
};

async function updatePost(req, res, next) {
    const id = req.validatedId;

    try {
        const { title, text } = req.body;
        const updatedPost = await db.updatePostById(title, text, id);

        res.status(200).json(updatedPost);
    } catch(err) {
        if (err.code === 'P2025') {
            const error = new Error('Post Not Found');
            error.status = 404;
            return next(error);
        };

        next(err);
    };
};

async function deletePost(req, res, next) {
    const id = req.validatedId;

    try {
        const deletedPost = await db.deletePostById(id);

        res.sendStatus(204);
    } catch(err) {
        if (err.code === 'P2025') {
            const error = new Error('Post Not Found');
            error.status = 404;
            return next(error);
        };

        next(err);
    };
};

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
};