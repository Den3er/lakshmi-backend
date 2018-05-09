import express from 'express';
import validations from '../../validations';
import controllers from '../../controllers';

const router = express.Router();

router.get('/status', (request, response) => response.json({ status: 'success' }));
router.post('/create-post', validations.createPost, controllers.createPost);
router.post('/posts', validations.posts, controllers.posts);

export default router;
