const prisma = require('../config/db');

async function getAllUsers() {
    const users = await prisma.user.findMany({
        include: {
            posts: true,
            comments: true,
        },
    });

    return users;
};

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            posts: true,
            comments: true,
        },
    });

    return user;
};

async function createNewUser(username, password) {
    await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
    });
};

async function updateUserById(username, password, id) {
    await prisma.user.update({
        where: { id: id },
        data: {
            username: username,
            password: password,
        },
    });
};

async function deleteUserById(id) {
    await prisma.user.delete({
        where: { id: id },
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
}