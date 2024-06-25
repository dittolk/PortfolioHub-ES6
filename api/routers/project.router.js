import { Router } from 'express';
import { verifyTokenUser } from '../middleware/user/user.auth.js';
import { createProject, deleteProject, getAllProjectOfPortfolio, updateProject } from '../controllers/project.controller.js';
import { multerUploadProject } from '../middleware/portfolios/project.multer.js';

const projectRouter = Router();

projectRouter.post('/portfolios/:portfolioId/projects/', verifyTokenUser, multerUploadProject().array("project_photos"), createProject);
projectRouter.patch('/portfolios/:portfolioId/projects/delete/:projectId', verifyTokenUser, deleteProject)
projectRouter.patch('/portfolios/:portfolioId/projects/:projectId', verifyTokenUser, updateProject)
projectRouter.get('/portfolios/:portfolioId/projects/', getAllProjectOfPortfolio)

export { projectRouter };