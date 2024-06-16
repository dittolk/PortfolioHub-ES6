import { Op } from 'sequelize';
import db from '../models/index.js';
import moment from 'moment';

const { User, Portfolio, Project } = db;

export const createPortfolio = async (req, res) => {
    try {
        const { title, description, user_id } = req.body;

        const findPortfolio = await Portfolio.findOne({
            where: {
                title: title,
                isDeleted: false
            },
        });

        if (findPortfolio) {
            return res.status(400).send({ message: "A portfolio with the same title is exist" })
        }

        if (!findPortfolio) {
            await Portfolio.create({
                ...req.body,
                UserId: user_id
            })

            return res.status(200).send({ message: "Your portfolio has been created" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getUserPortfolio = async (req, res) => {
    try {
        const user_id = req.params.userId
        const { page, sortBy, sortOrder = 'asc', search = '' } = req.query;

        const limit = 6;
        const offset = (page - 1) * limit;

        const dataPortfolio = await Portfolio.findAndCountAll({
            include: [
              {
                model: Project
              }
            ],
            where: {
                UserId: user_id,
                title: {
                    [Op.like]: `%${search}%`
                },
                isDeleted: false
            },
            // attributes: {
            //     exclude: ['password'],
            // },
            // order: [
            //   sortBy === 'branch.name' ?
            //   [Branch, 'name', sortOrder.toUpperCase()]
            //   :
            //   [[sortBy, sortOrder.toUpperCase()]]
            // ],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(dataPortfolio.count / limit);
        return res.status(200).send({ result: dataPortfolio, page, totalPages });
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message });
    }
}

export const getAllPortfolio = async(req, res) => {
    try{
        const { page, sortBy, sortOrder = 'asc', search = '' } = req.query;

        const limit = 5;
        const offset = (page - 1) * limit;

        const dataPortfolio = await Portfolio.findAndCountAll({
            include: [
              {
                model: User
              }
            ],
            where: {
                title: {
                    [Op.like]: `%${search}%`
                },
                isDeleted: false
            },
            // attributes: {
            //     exclude: ['password'],
            // },
            // order: [
            //   sortBy === 'branch.name' ?
            //   [Branch, 'name', sortOrder.toUpperCase()]
            //   :
            //   [[sortBy, sortOrder.toUpperCase()]]
            // ],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        const totalPages = Math.ceil(dataPortfolio.count / limit);
        return res.status(200).send({ result: dataPortfolio, page, totalPages });
    }catch(error){
        console.error(error)
        return res.status(500).send({ message: error.message });
    }
}

export const deletePortfolio = async (req, res) => {
    try {
        const portfolio_id = req.params.id

        const findPortfolio = await Portfolio.findOne({
            where: {
                id: portfolio_id,
                isDeleted: false
            },
        });

        if (!findPortfolio) {
            return res.status(404).send({ message: 'Portfolio not found' });
        }

        if (findPortfolio) {
            Portfolio.update(
                {
                    isDeleted: true,
                },
                {
                    where: {
                        id: portfolio_id
                    }
                }
            )
            return res.status(200).send({ message: 'Your portfolio has been deleted' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message })
    }
}

export const updatePortfolio = async (req, res) => {
    try {
        const portfolio_id = req.params.id
        const { title, description } = req.body;

        const findPortfolio = await Portfolio.findOne({
            where: {
                id: portfolio_id,
                isDeleted: false
            },
        });

        if (!findPortfolio) {
            return res.status(404).send({ message: 'Portfolio not found' });
        }

        if (findPortfolio) {
            const updateFields = {
                ...(title && { title }),
                ...(description && { description }),
              };
            Portfolio.update(
                updateFields,
                {
                    where: {
                        id: portfolio_id
                    }
                }
            )
            return res.status(200).send({ message: 'Your portfolio has been updated' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message })
    }
}