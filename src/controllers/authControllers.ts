import {Response, Request} from 'express'
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import base64 from 'nodejs-base64';
import CryptoJS from 'crypto-js';
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
            token
          }
        });
      }catch(e){
        res.status(404).json(e);
      }
  },
  login: async (req: Request, res: Response) => {
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
    } catch (error) {
      
    }
  },
  validate: async (req: Request, res: Response) => {
    const auth = await Auth.validateToken(req.headers.token as string);
    if (!auth){
      res.status(404).json({error:"token nao encontrado!"})
      return;
    }else{
      res.json({response:{
        validate: true,
        nome: auth.name
      }})
      return;
    }
  },
}

export default AuthController;