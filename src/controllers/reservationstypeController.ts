import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import Reservations from "../models/Reservations";
import ReservationsType from "../models/ReservationsType";

const reservationsType = ReservationsType();

const reservationstypeController = {
  getReservationsType: async (req: Request, res: Response) => {
    try {
      const reservationType = await reservationsType.find()
      if(reservationType) {
        res.json({
          response: {
            error: '',
            data:reservationType.map((item)=>{
              return{
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
      const reservationTypeAdd = await reservationsType.create({
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

export default reservationstypeController;