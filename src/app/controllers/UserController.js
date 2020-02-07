import HttpStatus from 'http-status-codes';

import User from '../models/User';

class UserController {
  async store(req, res) {

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'User already exists.' });
    }
    const { id, name, email, admin } = await User.create(req.body, { fields:
      [ 'name', 'email', 'password', 'password_hash'] });

    return res.json({
      id,
      name,
      email,
      admin
    });
  }
}

export default new UserController();
