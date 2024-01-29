import {Response, Request} from 'express'
import { v4 as uuidv4 } from 'uuid';
import { GetTemplate } from '../redis/templateRedis'

const RedisController = {
  sucessScreen: async (req: Request, res: Response) =>{      
    /* #swagger.auto = false
    #swagger.path = '/redis'
    #swagger.method = 'POST'
    #swagger.description = 'Endpoint de login na aplicacao.'
    #swagger.produces = ["application/json"]
    #swagger.consumes = ["application/json"]
    */
    /*#swagger.parameters['nome'] = {
      in: 'body',
      description: 'nome',
      required: true, 
      type: 'string'
    }
    */
    const { ...rest } = req.body;
    const listaPagamentos = [
      {
          id: "dab1af68669a86c075ba3952d169b4dd",
          titulo: "Cartão de crédito",
          subtitulo: "VISA \n4984********4033",
          tipo: "credito"
      },
      {
          id: "9ff6ebaf3ac2e82c9f4ba5dd21a1ce45",
          titulo: "Cartão de crédito",
          subtitulo: "VISA \n4984********8258",
          tipo: "credito"
      },
      {
          id: "ff6ebaf3ac2e82c9f4ba5dd21a1ce45s",
          titulo: "Débito em conta corrente",
          subtitulo: "Agência 551-7 \nConta 28787-3",
          tipo: "debito"
      }
    ]

    try {
      const subst = new GetTemplate(2);
      subst.setArgsChanges('{%1}', rest.nome);
      subst.setArgsChanges('{%2}', rest.idade);
      subst.setArgsChanges('{%3}', rest.perigo);
      const resultJSON = await subst.getTemplateToJSON('template_tela_sucesso');
  
      if(resultJSON && listaPagamentos){
        res.json({
          response:{
            metadata:{
              ...rest
            },
            ...resultJSON,
            listaPagamentos
          }
        })
      }else{
        res.status(400).json({
          error:"Algo deu errado, tente novemente mais tarde!!"
        })
      }
    } catch (error) {
      res.status(500).json({
        error
      })
    }
  },
  addData: async (req: Request, res: Response) => {
    const { ...rest} = req.body;
    const usuarioJSON = JSON.stringify({...rest});
    
    const subst = new GetTemplate(0);
    const result = await subst.set(uuidv4(), usuarioJSON);

    if(result)
      return res.json({
        response:{
          info:"Informacoes inseridas com sucesso!!"
        }
      });
    
    return res.status(400).json({
      error:"Algo deu errado, tente novamente mais tarde!!"
    })
  }
}
export default RedisController;