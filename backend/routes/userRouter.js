const { Router } = require('express');
const userRouter = Router();

const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authentication');
const validateId = require('../middleware/validateId');

userRouter.get('/me', authenticateJWT, userController.sendUserDetails);
userRouter.post('/login', userController.authenticateLogin);
// userRouter.get('/all', userController.getAllUsers);
userRouter.get('/:id', authenticateJWT, validateId, userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', authenticateJWT, validateId, userController.updateUser);
userRouter.delete('/:id', authenticateJWT, validateId, userController.deleteUser);

module.exports = userRouter;