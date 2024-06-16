import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyTokenUser = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token == null) {
      return res.status(401).send({
        message: 'Token is missing',
      });
    }
    token = token.split(' ')[1];

    let verifiedUser = jwt.verify(token, process.env.KEY_JWT);
    req.user = verifiedUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Your session has expired, please login again.',
        relogin: true
      });
    } else {
      return res.status(401).json({
        message: 'Unauthorized for User',
      });
    }
  }
};