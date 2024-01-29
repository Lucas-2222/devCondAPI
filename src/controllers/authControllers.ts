import {Response, Request} from 'express'
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import base64 from 'nodejs-base64';
import Users from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import Auth from '../middlewares/Auth';

const users = Users()
const AuthController = {
  register: async (req: Request, res: Response) =>{       
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          res.json({error: errors.mapped()})
          return;
      }

      const data = matchedData(req);
      const user = await users.findOne({email:data.email});
      if(user){
          res.json({error: "E-mail e/ou senha invalidos!!"})
          return;
      }

      const uuid = uuidv4();
      const passwordHash = await bcrypt.hash(data.password.toString(), 10);
      const {token, hash } = await Auth.createToken(uuid);
    
      users.create({
          ...req.body,
          id:uuid,
          token: token,
          password: passwordHash,
          hash
      })
     
      res.json({response:
        {
          info:"Usuario cadastrado com sucesso!",
          token,
          hash
        }
      });
    }catch(e){
      res.status(404).json(e);
    }
  },
  login: async (req: Request, res: Response) => {
    /*  #swagger.auto = false
    #swagger.path = '/manual/users/{id}'
    #swagger.method = 'POST'
    #swagger.description = 'Endpoint de login na aplicacao.'
    #swagger.produces = ["application/json"]
    #swagger.consumes = ["application/json"]
    */
    /*  #swagger.parameters['email'] = {
        in: 'header',
        description: 'Email do usuario.',
        required: true
        }
    */
    /*  #swagger.parameters['password'] = {
        in: 'header',
        description: 'Senha do usuario.',
        required: true, 
        type: 'string'
        }
    */
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          res.json({error: errors.mapped()})
          return;
      }

      const data = matchedData(req);
      const user = await users.findOne({email:data.email});
      if(!user){
          res.json({error: "E-mail e/ou senha invalidos!!"})
          return;
      }

      const match = await bcrypt.compare(data.password, user.password);
      if(!match){
          res.json({
              error: "E-mail e/ou senha invalidos!!"
          })
          return;
      }

      const fBase = base64.base64encode("123");
      const hash  = await bcrypt.hash(fBase as string, 10);
      await users.findOneAndUpdate({id: user.id},{hash})
      res.json({
        response: {
          token:user.token,
          name: user.name,
          hash,
          error:''
        }
      })
    } catch (error) {
      
    }
  },
  logout: async (req: Request, res: Response) => {
    await users.findOneAndUpdate({id:req.headers.idpessoa},{hash:""})
    res.json({response:{
      error:"",
      infor:"lougot realizado com sucesso!"
    }})

  },
  validate: async (req: Request, res: Response) => {
    const auth = await Auth.validateToken(req.headers.token as string);
    if (!auth){
      res.status(404).json({error:"token nao encontrado!"})
      return;
    }else{
      res.json({response:{
        validate: true,
        name: auth.name,
        error: ''
      }})
      return;
    }
  },
}

export default AuthController;