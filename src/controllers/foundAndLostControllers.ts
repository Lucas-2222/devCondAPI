import { Request, Response } from 'express';
import { v4 as uuiv4 } from 'uuid';
import FnlThings from '../models/FNL';

const fnl = FnlThings();

const FoundAndLostControllers = {
  getFnl: async (req: Request, res: Response) => {
    const fnls = await fnl.find();
    console.log(fnls)
    if(fnls) {
      res.json({
        response: {
          error: '',
          lost: fnls.filter((item)=> item.photo && !item.photoRec).map((item)=>({
            photo: item.photo,
            description: item.description,
            dateCreated: item.dateCreated,
            where: item.where
          })),
          recovered: fnls.filter((item)=> item.photoRec).map((item)=>({
            photo: item.photo,
            description: item.description,
            dateCreated: item.dateCreated,
            where: item.where,
            photoRec: item.photoRec,
            descriptionRec: item.descriptionRec,
            dateCreatedRec: item.dateCreatedRec,
            whereRec: item.whereRec
          }))
        }
      })
    }else{
      res.status(404).json({error:"Nenhuma reserva encontrada."})
    }
  },
  addFnl: async (req: Request, res: Response) => {
    try {
      const fnlCreated =  await fnl.create({
        description: req.body.description,
        photo: req.body.photo,
        dateCreated: req.body.dateCreated,
        where: req.body.where,
        id: uuiv4()
      });

      if(fnlCreated){
        res.json({
          response: {
            error: '',
            info: 'Inserido com sucesso'
          }
        })
      } else {
        res.status(404).json({error: "Algo deu errado."})
      }
    } catch (error) {
      res.status(404).json(error);
    }
  },
  putFnl: async (req: Request, res: Response) => {
    try {
      const updateRec = await fnl.findOneAndUpdate({
        id: req.params.id
      }, {
        descriptionRec: req.body.descriptionRec,
        photoRec: req.body.photoRec,
        dateCreatedRec: req.body.dateCreatedRec,
        whereRec: req.body.whereRec
      });
      if(updateRec) {
        res.json({
          response: {
            error: '',
            data: updateRec
          }
        })
      } else {
        res.status(404).json({error: 'Algo deu errado.'})
      }
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export default FoundAndLostControllers;