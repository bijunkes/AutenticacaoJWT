import express from 'express';
import { register, login, perfil } from '../controllers/userController.js';
import verifyToken from '../middlewares/userMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', verifyToken, perfil);

export default router;