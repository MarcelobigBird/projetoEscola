import multer from 'multer';

import multerConfig from '../config/multerConfig';

import PhotoModel from '../models/PhotoModel';

const upload = multer(multerConfig).single('photo');

class PhotographController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const photo = await PhotoModel.create({ originalname, filename, aluno_id });
        return res.status(200).json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ['aluno não existe'],
        });
      }
    });
  }
}

export default new PhotographController();
