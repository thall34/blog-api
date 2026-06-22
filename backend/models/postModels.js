const prisma = require('../config/db');

async function getAllPosts(id) {
    const posts = await prisma.post.findMany({
        include: {
            comments: true,
        },
    });

    return posts;
};

async function getPostById(id) {
    const post = await prisma.post.findUnique({
        where: { id: id },
        include: {
            comments: true,
        },
    });

    return post;
};

async function createNewPost(title, text, authorId) {
    const post = await prisma.post.create({
        data: {
            title: title,
            text: text,
            authorId: authorId,
        },
    });

    return post;
};

async function updatePostById(title, text, id) {
    await prisma.post.update({
        where: { id: id },
        data: {
            title: title,
            text: text,
        },
    });
};

async function deletePostById(id) {
    await prisma.post.delete({
        where: { id: id },
    });
};

module.exports = {
    getAllPosts,
    getPostById,
    createNewPost,
    updatePostById,
    deletePostById,
}