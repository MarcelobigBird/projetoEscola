import UserModel from '../models/UserModel';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await UserModel.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json(users);
      return users;
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await UserModel.findByPk(req.params.id);
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }


  // Update
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Id não foi enviado.'],
        });
      }
      const user = await UserModel.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['User not exist.'],
        });
      }
      const newUser = await user.update(req.body);
      return res.status(200).json(newUser);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        errors: ['Id não foi enviado.'],
      });
    }

    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não existe.'],
      });
    }

    const deleteUser = await user.destroy();
    return res.json(deleteUser);
  }
}

export default new UserController();
