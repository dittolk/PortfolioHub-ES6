import { Router } from 'express';
import { verifyTokenUser } from '../middleware/user/user.auth.js';
import { createPortfolio, deletePortfolio, getAllPortfolio, getUserPortfolio, updatePortfolio } from '../controllers/portfolio.controller.js';
import { rateLimit } from '../middleware/security/api.ratelimit.js';
import { multerUploadPortfolio } from '../middleware/portfolios/portfolio.multer.js';

const portfolioRouter = Router();

portfolioRouter.post('/', rateLimit('global'), verifyTokenUser, multerUploadPortfolio().single('image_cover'), createPortfolio)
portfolioRouter.get('/:userId/portfolios', rateLimit('global'), getUserPortfolio)
portfolioRouter.get('/', rateLimit('global'), getAllPortfolio)
portfolioRouter.patch('/delete/:id', rateLimit('global'), verifyTokenUser, deletePortfolio)
portfolioRouter.patch('/:id', rateLimit('global'), verifyTokenUser, updatePortfolio)

export { portfolioRouter };