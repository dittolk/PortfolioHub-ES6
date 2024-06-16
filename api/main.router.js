import { Router } from 'express';
import { userRouter } from './routers/user.router.js';
import { portfolioRouter } from './routers/portfolio.router.js';
import { projectRouter } from './routers/project.router.js';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Good luck`);
});

router.use('/users', userRouter)
router.use('/portfolios', portfolioRouter)
router.use('/', projectRouter)

// add another router here ...

export default router;
