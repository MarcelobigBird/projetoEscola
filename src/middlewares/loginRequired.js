import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

export default async (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await UserModel.findOne({ where: { id, email } });

    if (!user) return res.status(401).json({ errors: ['Invalid user'] });

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Expired or invalid token.'],
    });
  }
};


// authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoibWFyY2Vsb3NhbnRvc0BnbWFpbC5jb20iLCJpYXQiOjE2ODQyNjM0NzIsImV4cCI6MTY4NDg2ODI3Mn0.oU_T1GtRk8kgYlIrGhmwtUpbOH-_jsGYPvgmJiCOtFk
