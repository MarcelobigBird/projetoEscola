import AlunoModel from '../models/AlunoModel';

class HomeController {
  async index(req, res) {
    const novoAluno = await AlunoModel.create({
      nome: 'Maria',
      sobrenome: 'Augusta Miranda',
      email: 'mariaaugusta@gmail.com',
      idade: 65,
      peso: 80,
      altura: 1.58,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
