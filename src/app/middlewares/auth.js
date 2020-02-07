import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';

import authConfig from '../../config/auth';

export const authAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  if (!user.admin) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: 'Token unauthorized' });
  }

  return next();
};

export default async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: 'Token not provided' });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: 'Token not provided' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token invalid' });
  }
};
