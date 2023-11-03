import { Request, Response } from "express";
import Reservations from "../models/Reservations";

const reservations = Reservations();

const reservationsControllers = {
  getReservations: async (req: Request, res: Response) => {
    try {
      const reservation = await reservations.find()
      if(reservations) {
        res.json({
          response: {
            error: '',
            data:reservation.map((item)=>{
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
 
};

export default reservationsControllers;