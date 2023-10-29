import {Router} from 'express';
import AuthValidators from '../validators/authValidators';
import AuthController from '../controllers/authControllers';
import PropertiesControllers from '../controllers/propertiesControllers';
import Auth from '../middlewares/Auth';

const router = Router();

//Autenticacao
router.post('/auth/signup', AuthValidators.signup,  AuthController.register)
router.post('/auth/validate', AuthController.validate)
router.post('/auth/signin', AuthController.login)

//properties
router.post('/properties/add', Auth.private, PropertiesControllers.addProperties)
router.get('/properties/get', Auth.private, PropertiesControllers.getProperties)
export default router;