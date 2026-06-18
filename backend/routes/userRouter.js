const { Router } = require('express');
const userRouter = Router();

const userController = require('../controllers/userController');

userRouter.get('/all', userController.getAllUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;