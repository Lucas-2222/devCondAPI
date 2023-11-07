import { Request, Response } from "express";
import ReservationsDisabled from "../models/ReservationsDisabled";
import { v4 as uuidv4 } from 'uuid';

type WeekDays = {
  [key: string]: number
}

function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const reservationsDisabled = ReservationsDisabled();

const diasSemana: WeekDays = { ["domingo"]: 0, ['segunda-feira']: 1, ["terca-feira"]: 2, ['quarta-feira']: 3, ['quinta-feira']: 4, ['sexta-feira']: 5, ['sabado']: 6 };

const getDisabledDays = (disabledArray: any[]): Promise<String[]> => {
  return new Promise((resolve, reject)=>{
    const weekDays: any[] = [];

    for(let i = 0; i < disabledArray.length; i++) {
      const today = new Date();
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 3, 0);
      while (today < nextMonth) {        
        if(today.getDay() === diasSemana[disabledArray[i].disabledDates]) {
          weekDays.push(formatDateToYYYYMMDD(new Date(today)));
        }
        today.setDate(today.getDate() + 1)
      }
    }
    resolve(weekDays);
  });
}

const ReservationsDisabledControllers = {
  addDisabledDates: async ( req: Request, res: Response ) => {
    try {
      reservationsDisabled.create({
        id: uuidv4(),
        idReservationType: req.body.idReservationType,
        disabledDates: req.body.disabledDates
      });
      res.json({
        response: {
          error: '',
          info: 'Datas inseridas com sucesso.'
        }
      })
    } catch (error) {
      res.status(404).json(error)
    }
  },
  getDisabledDates: async (req: Request, res: Response) => {
    try {
      const reservationDisabled = await reservationsDisabled.find({idReservationType: req.params.id});
      if(reservationDisabled) {
        getDisabledDays(reservationDisabled)
          .then((item)=>{
            const resposta = [...item, "2023-11-04"]
            res.json({
              response: {
                error: '',
                data:resposta
              }
            })
          }
        )
      } else {
        res.status(404).json({
          response: {
            error: 'Algo deu errado. Tente Novamente.'
          }
        })
      }

    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export default ReservationsDisabledControllers;