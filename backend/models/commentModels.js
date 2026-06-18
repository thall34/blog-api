const prisma = require('../config/db');

async function getAllComments() {
    const comments = await prisma.comment.findMany()

    return comments;
}

async function getCommentById(id) {
    const comment = await prisma.comment.findUnique({
        where: { id: id },
    });

    return comment;
};

async function createNewComment(text, authorId, postId) {
    await prisma.comment.create({
        data: {
            text: text,
            authorId: authorId,
            postId: postId,
        },
    });
};

async function updateCommentById(text, id) {
    await prisma.comment.update({
        where: { id: id },
        data: {
            text: text,
        },
    });
};

async function deleteCommentById(id) {
    await prisma.comment.delete({
        where: { id: id },
    });
};

module.exports = {
    getAllComments,
    getCommentById,
    createNewComment,
    updateCommentById,
    deleteCommentById,
}