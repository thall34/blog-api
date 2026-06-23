const { Router } = require('express');
const postRouter = Router();

const postController = require('../controllers/postController');
const validateId = require('../middleware/validateId');
const authenticateJWT = require('../middleware/authentication');

postRouter.get('/all', authenticateJWT, postController.getAllPosts);
postRouter.get('/:id', authenticateJWT, validateId, postController.getPost);
postRouter.post('/', authenticateJWT, postController.createPost);
postRouter.put('/:id', authenticateJWT, validateId, postController.updatePost);
postRouter.delete('/:id', authenticateJWT, validateId, postController.deletePost);

module.exports = postRouter;