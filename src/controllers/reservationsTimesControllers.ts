import { Request, Response } from "express";
import ReservationsDisabled from "../models/ReservationsDisabled";
import { v4 as uuidv4 } from 'uuid';
import ReservationsTimes from "../models/ReservationsTimes";

const times = ReservationsTimes();

const ReservationTimesController = {
  getTimes: async (req: Request, res: Response) => {
    try {
      const time = await times.find({idReservationType: req.params.id});
      if(time) {
        res.json({
          response: {
            error: '',
            data: time 
          }
        })
      } else {
        res.status(404).json({
          response: {
            error: 'Algo deu errado. Tente Novamente.'
          }
        })
      }
    } catch (error) {
      res.status(404).json(error)
    }
   
  },
  addTimes: async (req: Request, res: Response) => {
    try {
      times.create({
        id: uuidv4(),
        idReservationsType: req.body.idReservationType,
        times: req.body.times
      });
      res.json({
        response: {
          error: '',
          info: 'Horários incluidos com sucesso.'
        }
      })
    } catch (error) {
      res.status(404).json(error)
    }
  }
}

export default ReservationTimesController;