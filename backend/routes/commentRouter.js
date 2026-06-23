const { Router } = require('express');
const commentRouter = Router();

const commentController = require('../controllers/commentController');
const validateId = require('../middleware/validateId');
const authenticateJWT = require('../middleware/authentication');

// id in this case is for the post
commentRouter.get('/all/:id', authenticateJWT, validateId, commentController.getAllCommentsByBlogId);
commentRouter.get('/:id', authenticateJWT, validateId, commentController.getComment);
// id in this case is for the post
commentRouter.post('/:id', authenticateJWT, validateId, commentController.createComment);
commentRouter.put('/:id', authenticateJWT, validateId, commentController.updateComment);
commentRouter.delete('/:id', authenticateJWT, validateId, commentController.deleteComment);

module.exports = commentRouter;