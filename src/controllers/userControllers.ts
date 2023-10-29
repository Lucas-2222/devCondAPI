import {Response, Request} from 'express'
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import Users from '../models/User';

const users = Users();
const UserController = {
    
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

          const passwordHash = await bcrypt.hash("123456", 10);
          const payload = (Date.now() + Math.random()).toString();
          const token = await bcrypt.hash(payload, 10);
          users.create({
              ...req.body,
              token: token,
              password: passwordHash,
          })
         
          res.json({response:{info:"Usuario cadastrado com sucesso!"}});
        }catch(e){
          res.status(404).json(e);
        }
    }
}

export default UserController;