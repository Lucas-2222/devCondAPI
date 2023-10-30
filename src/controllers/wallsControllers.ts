import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import Walls from "../models/Walls";

const walls = Walls();

const WallsControllers = {
  getWalls: async (req: Request, res: Response) => {
    try {
      const wall = await walls.find();
      if (wall){
        res.json({
          response:{
            data:wall.map((item)=>{
              const date = new Date(item.dateCreated);
              const dia = date.getDate();
              const mes = date.getMonth() + 1;
              const ano = date.getFullYear();
              const hora = date.getHours();
              const minutos = date.getMinutes();
              return{
                id: item.id,
                title: item.title,
                dateCreated:`${dia}/${mes}/${ano} ${hora}:${minutos}`,
                body: item.body,
                likes: item.likes,
                liked: item.liked,
              }
            })
          }
        });
        return;
      }
      res.status(404).json({error:"Nao foi encontrado nenhum item para o mural!"})

    } catch (error) {
      res.status(404).json({error})
    }
  },
  addWalls: async (req: Request, res: Response) => {
    try {

      const uuid = uuidv4();
      const dataAtual = new Date();
      const dia = dataAtual.getDate();
      const mes = dataAtual.getMonth() + 1;
      const ano = dataAtual.getFullYear();
      const hora = dataAtual.getHours();
      const minutos = dataAtual.getMinutes();
      const segundos = dataAtual.getSeconds();

      const wall = await walls.create({
        id:uuid,
        title: req.body.title,
        dateCreated: `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}.000+00:00`,
        body: req.body.body,
        likes: 0,
        liked: false
      })
      res.json({response:{
        info:"Propriedade cadastrada com sucesso!"
      }})

    } catch (error) {
      res.status(404).json({error})
    }
  },
  getOne: async (req: Request, res: Response) => {
    try {
      const wall = await walls.findOne({id:req.params.id})
      if(wall){
        const date = new Date(wall.dateCreated);
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();
        const hora = date.getHours();
        const minutos = date.getMinutes();
        res.json({
          response:{
            data:{
              id: wall.id,
              title: wall.title,
              dateCreated:`${dia}/${mes}/${ano} ${hora}:${minutos}`,
              body: wall.body,
              likes: wall.likes,
              liked: wall.liked,
            }
          }
        })
        return;
      }else{
        res.json({error: "Mural nao encontrado!!"})
      }
    } catch (error) {
      res.json({error})
    }
  }
}

export default WallsControllers;