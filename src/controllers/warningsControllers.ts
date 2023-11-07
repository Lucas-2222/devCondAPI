import { Request, Response } from "express";
import Warnings from "../models/Warnings";
import { v4 as uuidv4 } from 'uuid';
import { FormatDateToString, FormatStringToDate } from "../utils/formatDate";
import {InsertPhotos} from "./photoContollers";

const warnings = Warnings();

const WarningsControllers = {
  addWarnings: async (req: Request, res: Response) => {
    try {
      const uuid = uuidv4();
      warnings.create({
        id: req.body.idpessoa,
        idWarning: uuid,
        dateCreated: FormatDateToString(),
        title: req.body.title,
        status: req.body.status
      });
      if(req.files?.image){
        InsertPhotos(req, uuid)
          .then(()=>{
            res.json({response: {
              error: '',
              info: 'Ocorrência cadastrada com sucesso.',
              idWarning:uuid
            }})
          })
          .catch((error)=>{
            res.status(404).json(error);
          })
      }else{
        res.json({response: {
          error: '',
          info: 'Ocorrência cadastrada com sucesso.',
          idWarning:uuid
        }})
      }
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getWarnings: async (req: Request, res: Response) => {
    try {
      const warning = await warnings.find();
      res.json({response: {
        error: '',
        warning: warning.map((item)=>({
          idWarning: item.idWarning,
          title: item.title,
          status: item.status,
          dateCreated: FormatStringToDate(item.dateCreated)
        }))
      }})
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getWarnigs_phtos: async(req: Request, res: Response) => {
    const agg = [
      {
        $lookup: {
          from: "photos",
          localField: "idWarning",
          foreignField: "id",
          as: "photos",
          pipeline: [
            {
              $project: {
                name: 1,
                idPhoto: 1,
                title: 1,
                _id: 0
              }
            }
          ]
        }
      },
      {
        $addFields: {
          dateCreated: {
            $dateToString: {
              format: '%d/%m/%Y %H:%M',
              date: '$dateCreated'
            }
          }
        }
      },
      {
        $project: {
          idWarning: 1,
          title: 1,
          status: 1,
          dateCreated: "$dateCreated",
          _id: 0,
          photos: "$photos"
        }
      }
    ];    

    try {
      const warning = await warnings.aggregate(agg)
      res.json({
        response:{
          error:"",
          warning
        }
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export default WarningsControllers;