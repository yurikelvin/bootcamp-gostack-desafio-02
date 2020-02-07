import * as Yup from 'yup';
import HttpStatus from 'http-status-codes';

class Validator {
  async validateSession(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validation fails' });
    }

    return next();
  }
  async validateNewUser(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validation fails' });
    }

    return next();
  }

  async validateNewRecipient(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      postal_code: Yup.string()
        .required()
        .length(9)
        .matches(/[0-9]{5}-[0-9]{3}/),
      number: Yup.string(),
      city: Yup.string()
        .required()
        .min(2),
      state: Yup.string()
        .required()
        .min(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Validation fails' });
    }

    return next();
  }
}

export default new Validator();
