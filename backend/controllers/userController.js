const db = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function getAllUsers(req, res, next) {
    try {
        const users = await db.getAllUsers();

        res.json(users)
    } catch(err) {
        next(err)
    };
};

async function getUserById(req, res, next) {
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.createNewUser(username, hashedPassword);

        res.status(200).json(newUser);
    } catch(err) {
        next(err);
    };
};

// ensure once bcrypt is added to not send back the encrypted password
async function updateUser(req, res, next) {
    const id = req.validatedId;
    const user = await db.getUserById(id);

    try {
        const { username } = req.body;
        if (req.body.password !== '') {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const updatedUser = await db.updateUserById(username, hashedPassword, id);
            res.status(200).json(updatedUser);
        } else {
            const updatedUser = await db.updateUserById(username, user.password, id);
            res.status(200).json(updatedUser);
        }
    } catch(err) {
        next(err);
    };
};

async function deleteUser(req, res, next) {
    const id = req.validatedId;

    try {
        const deletedUser = await db.deleteUserById(id);

        res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

async function authenticateLogin(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await db.getUserByName(username);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return next(new Error('Incorrect Password'));
        };

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            },
        );

        res.json({ 
            token,
            user: {
                id: user.id,
                username: user.username,
            }, 
        });
    } catch(err) {
        next(err)
    };
};

async function sendUserDetails(req, res, next) {
    try {
        res.json(req.user);
    } catch(err) {
        next(err)
    };
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticateLogin,
    sendUserDetails,
};