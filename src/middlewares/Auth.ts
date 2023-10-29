import { Request, Response, NextFunction } from 'express';
import base64 from 'nodejs-base64';
import CryptoJS from 'crypto-js';
import Users from '../models/User';
import bcrypt from 'bcrypt';

interface CreateTH {
  token: string;
  hash: string;
}

const users = Users()
const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.token){
        res.json({notAllowed: true});
        return;
    }

    if(!req.headers.hash){
        res.json({notAllowed: true});
        return;
    }

    let token: any = '';
    let hash: any = ''; 

    if(req.headers.token){
        token = req.headers.token;
    }
    if(token == ''){
        res.json({notAllowed:true});
        return;
    }

    if(req.headers.hash){
        hash = req.headers.hash;
    }
    if(hash == ''){
        res.json({notAllowed:true});
        return;
    }
    const userToken = await Auth.validateToken(req.headers.token as string);
    if(!userToken){
       res.json({notAllowed:true});
       return;
    } 
    const userHash = await Auth.checkHash(userToken.id,hash);
    if(!userHash){
       res.json({notAllowed:true});
       return;
    } 
    req.body.idpessoa = userToken.id;
    next();
  },
  getId: async (token: string) =>{
    try{
      const jwt = token.split('.')
      if(jwt.length === 3){
        const pBase = base64.base64decode(jwt[2])
        const signature = CryptoJS.AES.decrypt(pBase,"abc123");
        const fBase = signature.toString(CryptoJS.enc.Utf8).split('.');
        if(fBase[0] === jwt[0]){
          if(fBase[1] === jwt[1]){
              const { id } = JSON.parse(base64.base64decode(jwt[1]));
              return id;
          }else{
              return;
          }
        }else{
          return;
        }
      }else{
        return;
      }
    }catch(e){
      return e; 
    }
  },
	validateToken: async (token: string) => {
    try{
      const id = await Auth.getId(token);
      const user = await users.findOne({id});
      return user
    }catch(e){
        return e; 
    }
  },
  checkHash: async (id: string, hash: string): Promise<boolean> =>{
    const user = await users.findOne({id})
    if(user.hash ===  hash){
        return true
    }else{
        return false;
    };
},
	createToken: async (id: string): Promise<CreateTH> => {
    const pBase: string = base64.base64encode(JSON.stringify({typ:"JWT", alg:"HS256"}))as string;
    const hBase: string = base64.base64encode(JSON.stringify({id})) as string;
    const signature = CryptoJS.AES.encrypt(`${pBase}.${hBase}`,"abc123").toString();
    const fBase = base64.base64encode(signature);

    const hash  = await bcrypt.hash(fBase as string, 10);
    const token =  `${pBase}.${hBase}.${fBase}`;
    return{ token, hash }
  },
}

export default Auth;
