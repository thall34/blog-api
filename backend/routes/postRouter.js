const { Router } = require('express');
const postRouter = Router();

const postController = require('../controllers/postController');

postRouter.get('/all', postController.getAllPosts);
postRouter.get('/:id', postController.getPost);
// id in this case is for the author
postRouter.post('/:id', postController.createPost);
postRouter.put('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;