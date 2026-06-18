const db = require('../models/userModels');

async function getAllUsers(req, res, next) {
    try {
        const users = await db.getAllUsers();

        // if (!users || users.length === 0) {
        //     const error = new Error ('Failed to Fetch Users');
        //     error.status = 404;
        //     return next(error)
        // };

        res.json(users)
    } catch(err) {
        next(err)
    };
};

async function getUser(req, res, next) {
    const id = req.validatedId;

    try {
        const user = await db.getUserById(id);

        if (!user) {
            const error = new Error ('Failed to Fetch User');
            error.status = 404;
            return next(error)
        };

        res.json(user);
    } catch(err) {
        next(err)
    };
};

async function createUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const newUser = await db.createNewUser(username, password);

        res.status(200).json(newUser);
    } catch(err) {
        next(err);
    };
};

async function updateUser(req, res, next) {
    const id = req.validatedId;

    try {
        const { username, password } = req.body;
        const updatedUser = await db.updateUserById(username, password, id);

        res.status(200).json(updatedUser);
    } catch(err) {
        next(err);
    };
};

async function deleteUser(req, res, next) {
    const id = req.validatedId;

    try {
        const deletedUser = await db.deleteUserById(id);

        res.status(200).json(deletedUser);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};