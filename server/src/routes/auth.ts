import express from 'express';

import AuthController from '../controllers/auth/auth';

const authController = new AuthController();
const authRoutes = express.Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);

export default authRoutes;