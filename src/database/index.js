import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import AlunoModel from '../models/AlunoModel';
import UserModel from '../models/UserModel';
import PhotoModel from '../models/PhotoModel';

const models = [AlunoModel, UserModel, PhotoModel];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));


