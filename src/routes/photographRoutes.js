import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';


import photographController from '../controllers/PhotographController';


const router = new Router();

router.post('/', loginRequired, photographController.store);

export default router;
