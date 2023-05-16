import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import AlunoModel from '../models/AlunoModel';
import UserModel from '../models/UserModel';

const models = [AlunoModel, UserModel];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));


