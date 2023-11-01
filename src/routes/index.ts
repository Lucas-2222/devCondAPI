import {Router, Request, Response} from 'express';
import AuthValidators from '../validators/authValidators';
import AuthController from '../controllers/authControllers';
import PropertiesControllers from '../controllers/propertiesControllers';
import WallsControllers from '../controllers/wallsControllers';
import Auth from '../middlewares/Auth';
import WarningsControllers from '../controllers/warningsControllers';
import {PhotoControllers} from '../controllers/photoContollers';

const router = Router();

//Autenticacao
router.post('/auth/signup', AuthValidators.signup,  AuthController.register)
router.post('/auth/validate', Auth.private, AuthController.validate)
router.post('/auth/signin', AuthValidators.signin, AuthController.login)
router.post('/auth/logout', Auth.private, AuthController.logout)

//properties
router.post('/properties', Auth.private, PropertiesControllers.addProperties)
router.get('/properties', Auth.private, PropertiesControllers.getProperties)

//Walls
router.get('/walls', Auth.private, WallsControllers.getWalls)
router.get('/walls/:id/walls', Auth.private, WallsControllers.getOne)
router.post('/walls', Auth.private, WallsControllers.addWalls)
router.get('/walls/count', WallsControllers.countLikes);
router.get('/walls/users', Auth.private, WallsControllers.user_properties);

//Warnings
router.get('/warnings', Auth.private, WarningsControllers.getWarnings)
router.get('/warningsphotos', Auth.private, WarningsControllers.getWarnigs_phtos)
router.post('/warnings', Auth.private, WarningsControllers.addWarnings)

//photos
router.post('/photos', Auth.private, PhotoControllers.addPhotos)
router.get('/photos', Auth.private, PhotoControllers.getPhotos)
router.get('/images/:name', (req, res) => {
  res.sendFile(`${__dirname}../public/images/${req.params.name}`);
});

export default router;
