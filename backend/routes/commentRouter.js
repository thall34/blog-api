const { Router } = require('express');
const commentRouter = Router();

const commentController = require('../controllers/commentController');

commentRouter.get('/all', commentController.getAllComments);
commentRouter.get('/:id', commentController.getComment);
// id in this case is for the post
commentRouter.post('/:id', commentController.createComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);

module.exports = commentRouter;