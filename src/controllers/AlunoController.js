import AlunoModel from '../models/AlunoModel';
import PhotoModel from '../models/PhotoModel';

class AlunoController {
  async index(req, res) {
    const students = await AlunoModel.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [PhotoModel, 'id', 'DESC']],
      include: {
        model: PhotoModel,
        attributes: ['url', 'filename'],
      },
    });
    res.status(200).json(students);
  }

  async store(req, res) {
    try {
      const createStudent = await AlunoModel.create(req.body);

      const { id, nome, email } = createStudent;
      return res.status(200).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }


  async show(req, res) {
    try {
      if (!req.params.id) {
        res.status(400).json({
          errors: ['Id invalid'],
        });
      }

      const student = await AlunoModel.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [PhotoModel, 'id', 'DESC']],
        include: {
          model: PhotoModel,
          attributes: ['url', 'filename'],
        },
      });
      if (!student) return res.status(400).json({ errors: ['Student not exist.'] });

      return res.status(200).json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }


  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Id não foi enviado.'],
        });
      }

      const student = await AlunoModel.findByPk(req.params.id);
      if (!student) return res.status(400).json({ errors: ['Student not exist.'] });

      const newStudent = await student.update(req.body);
      return res.status(200).json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }


  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id não foi enviado.'],
        });
      }

      const student = await AlunoModel.findByPk(id);
      if (!student) {
        return res.status(401).json({
          errors: ['Student not exist'],
        });
      }

      const studentDeletado = await student.destroy();
      return res.status(200).json(studentDeletado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}


export default new AlunoController();
