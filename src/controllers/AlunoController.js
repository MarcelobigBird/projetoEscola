import AlunoModel from '../models/AlunoModel';

class HomeController {
  async index(req, res) {
    const novoAluno = await AlunoModel.create({
      nome: 'Marcelo',
      sobrenome: 'Pereira dos Santos',
      email: 'marcelomuckeiro2022@gmail.com',
      idade: 41,
      peso: 80,
      altura: 1.80,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
