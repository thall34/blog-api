const prisma = require('../config/db');

async function getAllCommentsByBlogId(postId) {
    const comments = await prisma.comment.findMany({
        where: { postId: postId },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
        orderBy: { updatedAt: 'asc' },
    });
    
    return comments;
}

async function getCommentById(id) {
    const comment = await prisma.comment.findUnique({
        where: { id: id },
    });

    return comment;
};

async function createNewComment(text, authorId, postId) {
    const comment = await prisma.comment.create({
        data: {
            text: text,
            authorId: authorId,
            postId: postId,
        },
    });

    return comment;
};

async function updateCommentById(text, id) {
    const comment = await prisma.comment.update({
        where: { id: id },
        data: {
            text: text,
        },
    });

    return comment;
};

async function deleteCommentById(id) {
    await prisma.comment.delete({
        where: { id: id },
    });
};

module.exports = {
    getAllCommentsByBlogId,
    getCommentById,
    createNewComment,
    updateCommentById,
    deleteCommentById,
}