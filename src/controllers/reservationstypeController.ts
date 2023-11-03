import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import Reservations from "../models/Reservations";
import ReservationsType from "../models/ReservationsType";
import ReservationsDisabled from "../models/ReservationsDisabled";



const reservationsType = ReservationsType();

const ReservationstypeController = {

  getReservationsType: async (req: Request, res: Response) => {
    try {
      const reservationType = await reservationsType.find()
      if(reservationType) {
        res.json({
          response: {
            error: '',
            data:reservationType.map((item)=>{
              return{
                id: item.id,
                title: item.title,
                cover: item.cover,
                dates: item.dates
              }
            })
          }
        });
        return;
      } 
      res.status(404).json({error:"Nenhuma reserva encontrada."})
    } catch (error) {
      res.status(404).json({error})
    }
  },
  addReservationsType: async (req: Request, res: Response) => {
    try {
      await reservationsType.create({
        id: uuidv4(),
        cover: req.body.cover,
        title: req.body.title,
        dates: req.body.dates
      });
      res.json({
        response: {
          error: '',
          info: 'Inserido com sucesso.'
        }
      })
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export {ReservationstypeController};