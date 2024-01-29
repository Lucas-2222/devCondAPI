import {Response, Request} from 'express'
import Properties from '../models/Properties'
import { v4 as uuidv4 } from 'uuid';

const properties = Properties();

const PropertiesControllers = {
  addProperties: async (req: Request, res: Response) =>{
    const uuid = uuidv4();
    properties.create({
      id:req.headers.idpessoa,
      idProperties:uuid,
      name:req.body.name
    })
    res.json({response:{
      info:"Propriedade cadastrada com sucesso!",
      error:""
    }})
  },
  getProperties: async (req: Request, res: Response) => {
    const propertie = (await properties.find({id:req.headers.idpessoa})).map((item)=>({
      idProperties:item.idProperties,
      name: item.name
    }))
    res.json({response:{ 
      properties:propertie,
      error:""
    }})
  }
}

export default PropertiesControllers;