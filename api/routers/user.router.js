import { Router } from 'express';
import { createUser, getAllUser, getProfile, keepLoginUser, loginUser } from '../controllers/user.controller.js';
import { verifyTokenUser } from '../middleware/user/user.auth.js';
import { checkLoginUser, checkRegisterUser } from '../middleware/user/user.validator.js';
import { rateLimit } from '../middleware/security/api.ratelimit.js';

const userRouter = Router();

userRouter.post('/', rateLimit('global'), checkRegisterUser, createUser);
userRouter.post('/login', rateLimit('login'), checkLoginUser, loginUser)
userRouter.get('/keeplogin', rateLimit('authenticated'), verifyTokenUser, keepLoginUser)
userRouter.get('/', rateLimit('global'), getAllUser)
userRouter.get('/:userId', rateLimit('global'), getProfile)

export { userRouter };