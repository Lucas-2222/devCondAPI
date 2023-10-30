import {Router} from 'express';
import AuthValidators from '../validators/authValidators';
import AuthController from '../controllers/authControllers';
import PropertiesControllers from '../controllers/propertiesControllers';
import WallsControllers from '../controllers/wallsControllers';
import Auth from '../middlewares/Auth';

const router = Router();

//Autenticacao
router.post('/auth/signup', AuthValidators.signup,  AuthController.register)
router.post('/auth/validate', Auth.private, AuthController.validate)
router.post('/auth/signin', AuthValidators.signin, AuthController.login)

//properties
router.post('/properties', Auth.private, PropertiesControllers.addProperties)
router.get('/properties', Auth.private, PropertiesControllers.getProperties)

//Walls
router.get('/walls', Auth.private, WallsControllers.getWalls)
router.get('/walls/:id', Auth.private, WallsControllers.getOne)
router.post('/walls', Auth.private, WallsControllers.addWalls)

export default router;
