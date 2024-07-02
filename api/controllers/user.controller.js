import { Op } from 'sequelize';
import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment'

const { User, Portfolio } = db;

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const findUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (findUser == null) {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      const result = await User.create({
        ...req.body,
        password: hashPassword
      });
      return res.status(201).send({ message: 'Please check your email to verify your account' });
    }
    return res.status(400).send({ message: 'A user with this username or email has already exist' });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(req.body);
    let dataLoginUser;
    let isValid;

    dataLoginUser = await User.findOne({
      where: email ? { email } : username ? { username } : null,
    });

    if (!dataLoginUser) {
      return res.status(404).send({ message: 'Account not found' });
    }

    if (!dataLoginUser.isVerified) {
      return res.status(403).send({ message: "Your account isn't verified" });
    }

    if (dataLoginUser.password) {
      isValid = await bcrypt.compare(password, dataLoginUser.password);
    }

    if (!isValid) {
      return res.status(401).send({ message: 'Incorrect password' });
    }

    let payload = {
      id: dataLoginUser.id,
      username: dataLoginUser.username
    };
    const expiresIn = req.query.rememberme === 'true' ? undefined : '24h';
    const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn });

    dataLoginUser.dataValues.formattedCreatedAt = moment(dataLoginUser.createdAt).format('MMMM Do YYYY, h:mm:ss a');

    return res.status(200).send({
      message: 'Login success',
      result: dataLoginUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const keepLoginUser = async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!userData) {
      return res.status(404).send({ message: 'User not found' });
    }

    userData.dataValues.formattedCreatedAt = moment(userData.createdAt).format('MMMM Do YYYY, h:mm:ss a');

    return res.status(200).send({ message: 'Keep login', result: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { page, sortBy, sortOrder = 'asc', search = '' } = req.query;

    const limit = 9;
    const offset = (page - 1) * limit;

    const dataUser = await User.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${search}%`
        }
      },
      attributes: {
        exclude: ['password'],
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(dataUser.count / limit);
    return res.status(200).send({ result: dataUser, page, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.id

    const findUser = await User.findOne({
      where: {
        id: user_id,
        isDeleted: false
      },
    });

    if (!findUser) {
      return res.status(404).send({ message: 'Account not found' });
    }

    if (findUser) {
      User.update(
        {
          isDeleted: true,
        },
        {
          where: {
            id: user_id
          }
        }
      )
      return res.status(200).send({ message: 'Your account has been deleted' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user_id = req.params.username;
    const userData = await User.findOne({
      where: {
        username: user_id,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (!userData) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).send({ result: userData });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message })
  }
}