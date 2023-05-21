import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({
        errors: ['User not exist'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid password'],
      });
    }

    const { id } = user;
    console.log(id);

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });

    return res.json({ token });
  }
}

export default new TokenController();
