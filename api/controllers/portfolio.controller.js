import { Op } from 'sequelize';
import db from '../models/index.js';
import moment from 'moment';
import 'dotenv/config';
import redisClient from '../config/redis.config.js';

const { User, Portfolio, Project, ProjectImage } = db;

export const createPortfolio = async (req, res) => {
    try {
        const { title, description, user_id } = req.body;

        const findPortfolio = await Portfolio.findOne({
            where: {
                title: title,
                isDeleted: false,
                UserId: user_id
            },
        });

        if (findPortfolio) {
            return res.status(400).send({ message: "A portfolio with the same title is exist" })
        }

        if (!findPortfolio) {
            await Portfolio.create({
                ...req.body,
                mediaUrl: `${process.env.BASE_URL_API}public/portfolios/${req.file?.filename}`,
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

        const cacheKey = `userPortfolio:${user_id}:${page}:${sortBy}:${sortOrder}:${search}`;
        const cachedPortfolio = await redisClient.get(cacheKey);

        if (cachedPortfolio) {
            return res.status(200).json(JSON.parse(cachedPortfolio));
        }

        const dataPortfolio = await Portfolio.findAndCountAll({
            // include: [
            //   {
            //     model: Project
            //   }
            // ],
            where: {
                UserId: user_id,
                title: {
                    [Op.like]: `%${search}%`
                },
                isDeleted: false
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(dataPortfolio.count / limit);
        const result = { result: dataPortfolio, page, totalPages };
        await redisClient.setEx(cacheKey, 100, JSON.stringify(result));

        return res.status(200).send(result);
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message });
    }
}

export const getPortfolio = async(req, res) => {
    try{
        const portfolio_id = req.params.portfolioId;

        const dataPortfolio = await Portfolio.findOne({
            include: [
              {
                model: Project,
                include: [
                    {
                        model: ProjectImage
                    }
                ]
              },
              {
                model: User,
                attributes: {
                    exclude: ['password'],
                  },
              }
            ],
            where:{
                id: portfolio_id
            }
        })

        if(!dataPortfolio){
            return res.status(404).send({ message: 'Portfolio not found' });
        }

        return res.status(200).send({ result: dataPortfolio });
    }catch(error){
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
                [Op.and]: [
                  {
                    isDeleted: false
                  },
                  {
                    [Op.or]: [
                      {
                        title: {
                          [Op.like]: `%${search}%`
                        }
                      },
                      {
                        '$User.name$': {
                          [Op.like]: `%${search}%`
                        }
                      },
                      {
                        '$User.email$': {
                          [Op.like]: `%${search}%`
                        }
                      }
                    ]
                  }
                ]
              },
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