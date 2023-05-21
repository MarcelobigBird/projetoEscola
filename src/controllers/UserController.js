import UserModel from '../models/UserModel';

class UserController {
  async store(req, res) {
    try {
      const newUser = await UserModel.create(req.body);
      const { id, nome, email } = newUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await UserModel.findAll({ attributes: ['id', 'nome', 'email'] }); // atributes filtra os campos para exibir
      console.log(`UserId: ${req.userId}, userEmail: ${req.userEmail}`);
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

      const { id, nome, email } = user;
      return res.status(200).json({ id, nome, email });
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
      const user = await UserModel.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not exist.'],
        });
      }
      const newUser = await user.update(req.body);
      const { id, nome, email } = newUser;
      return res.status(200).json({ id, nome, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    const user = await UserModel.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não existe.'],
      });
    }

    const deleteUser = await user.destroy();
    const { id, nome, email } = deleteUser;
    return res.json({ id, nome, email });
  }
}

export default new UserController();
