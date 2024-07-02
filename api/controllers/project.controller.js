import { Op } from 'sequelize';
import db from '../models/index.js';
import moment from 'moment';
import sanitize from '../utils/sanitize.js';

const { Portfolio, Project, ProjectImage } = db;

export const createProject = async (req, res) => {
    try {
        const portfolio_id = req.params.portfolioId
        const { title, description, position } = req.body;
        const photos = req.files

        const portfolio = await Portfolio.findOne({ where: { id: portfolio_id, UserId: req.user.id } });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const findProject = await Project.findOne({
            where: {
                title: title,
                isDeleted: false
            },
        });

        if (findProject && findProject.PortfolioId === portfolio_id) {
            return res.status(400).send({ message: "A Project with the same title is exist" })
        }
        const result = await Project.create({
            ...req.body,
            PortfolioId: portfolio_id,
            UserId: req.user.id,
        })

        if(photos){
            for (const file of photos) {
                await ProjectImage.create({
                    mediaUrl: `${process.env.BASE_URL_API}public/portfolios/${sanitize(req.user.username)}/${sanitize(req.body.portfolioTitle)}/${sanitize(req.body.title)}/${file.filename}`,
                    ProjectId: result.id
                });
            }
        }

        return res.status(201).send({ message: "Your Project has been created" })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    try {
        const portfolio_id = req.params.portfolioId
        const project_id = req.params.projectId
        const { title, description } = req.body

        const portfolio = await Portfolio.findOne({ where: { id: portfolio_id, UserId: req.user.id } });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const findProject = await Project.findOne({
            where: {
                id: project_id,
                isDeleted: false
            },
        });

        if (!findProject) {
            return res.status(400).send({ message: "Project not found" })
        }

        const updateFields = {
            ...(title && { title }),
            ...(description && { description }),
        };

        Project.update(
            updateFields,
            {
                where: {
                    id: project_id
                }
            }
        )
        return res.status(200).send({ message: 'Your project has been updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const portfolio_id = req.params.portfolioId
        const project_id = req.params.projectId

        const portfolio = await Portfolio.findOne({ where: { id: portfolio_id, UserId: req.user.id } });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const findProject = await Project.findOne({
            where: {
                id: project_id,
                isDeleted: false
            },
        });

        if (!findProject) {
            return res.status(400).send({ message: "Project not found" })
        }

        Project.update(
            {
                isDeleted: true,
            },
            {
                where: {
                    id: project_id
                }
            }
        )
        return res.status(200).send({ message: 'Your project has been deleted' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getAllProjectOfPortfolio = async (req, res) => {
    try {
        const portfolio_id = req.params.portfolioId
        const { page, sortBy = 'position', sortOrder = 'asc', search = '' } = req.query;

        const limit = 5;
        const offset = (page - 1) * limit;

        const portfolio = await Portfolio.findOne({ where: { id: portfolio_id } });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const dataProject = await Project.findAndCountAll({
            where: {
                PortfolioId: portfolio_id,
                title: {
                    [Op.like]: `%${search}%`
                },
                isDeleted: false
            },
            order:[[sortBy, sortOrder.toUpperCase()]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(dataProject.count / limit);
        return res.status(200).send({ result: dataProject, page, totalPages });
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message });
    }
}