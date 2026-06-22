const { Router } = require('express');
const postRouter = Router();

const postController = require('../controllers/postController');
const validateId = require('../middleware/validateId');
const authenticateJWT = require('../middleware/authentication');

postRouter.get('/all', authenticateJWT, postController.getAllPosts);
postRouter.get('/:id', authenticateJWT, validateId, postController.getPost);
// id in this case is for the author
postRouter.post('/:id', authenticateJWT, validateId, postController.createPost);
postRouter.put('/:id', authenticateJWT, validateId, postController.updatePost);
postRouter.delete('/:id', authenticateJWT, validateId, postController.deletePost);

module.exports = postRouter;