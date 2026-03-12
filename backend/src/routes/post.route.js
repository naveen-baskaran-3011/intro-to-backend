import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controllers/post.controller.js';

const router = Router();

router.get('/', getAllPosts);
router.post('/create', createPost);
router.get('/:id', getPost);
router.patch('/update/:id', updatePost);
router.delete('/:id', deletePost);

export default router;