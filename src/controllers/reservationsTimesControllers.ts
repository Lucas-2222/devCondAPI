import { Request, Response } from "express";
import ReservationsDisabled from "../models/ReservationsDisabled";
import { v4 as uuidv4 } from 'uuid';
import ReservationsTimes from "../models/ReservationsTimes";
import Reservations from "../models/Reservations";
import ReservationsSaved from "../models/ReservationsSaved";

const times = ReservationsTimes();
const reservationsSaved = ReservationsSaved();

type Horus = {
  time: string,
  disable: boolean
}

async function generateTimeSlots(startTime: Date, endTime: Date, interval: number, req: Request): Promise<Horus[]> {2

  const timeSlots: Horus[] = [];
  let current = new Date(startTime);
  const end = new Date(endTime);

  while (current < end) {
    const startHour = current.getHours();
    const startMinute = current.getMinutes();
    
    current.setMinutes(current.getMinutes() + interval);
    const endHour = current.getHours();
    const endMinute = current.getMinutes();
    
    const timeSlot = `${startHour}:${startMinute.toString().padStart(2, '0')} - ${endHour}:${endMinute.toString().padStart(2, '0')}`;
    const reservationsShelduler = await reservationsSaved.find({
      idReservationType: req.params.idReservationType,
      date: new Date(req.params.date),
      time: timeSlot
    })
    
    timeSlots.push({time:timeSlot, disable: reservationsShelduler.length > 0});
  }

  return timeSlots;
}

const ReservationTimesController = {
  getTimes: async (req: Request, res: Response) => {
    try {
      const time = await times.findOne({idReservationType: req.params.idReservationType});
      const timeSlots = await generateTimeSlots(new Date(0, 0, 0, time.initialHour, 0), new Date(0, 0, 0, time.finalHour, 0), 60, req);
        
      if(time) {
        res.json({
          response: {
            error: '',
            data: timeSlots
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
        idReservationType: req.body.idReservationType,
        initialHour: req.body.initialHour,
        finalHour: req.body.finalHour
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
  },
  setReservations: async (req: Request, res: Response) => {
    try {
      // const reservation = new reservationsSaved({
      //   id: uuidv4(),
      //   idReservationType: req.body.idReservationType,
      //   idUser: req.body.idpessoa,
      //   date: req.body.date,
      //   time: req.body.time
      // });
      await reservationsSaved.create({
        id: uuidv4(),
        idReservationType: req.body.idReservationType,
        idUser: req.body.idpessoa,
        date: new Date(req.body.date),
        time: req.body.time
      })

      //const savedReservation = await reservation.save();
      res.json({
        response: {
          error: '',
          info: "Agendamento realizado com sucesso!!"
        }
      });
    } catch (error) {
      res.status(500).json({
        response: {
          error: 'Houve um erro ao salvar a reserva. Tente novamente.'
        }
      });
    }
  },
  getReservations: async(req: Request, res: Response) => {
    try {
      const reservationsShelduler = await reservationsSaved.find({idUser: req.body.idpessoa})

      if(!reservationsShelduler) {
        res.status(404).json({
          response:{
            error:"Algo de errado, tente mais novamente."
          }
        })
        return;
      }
      res.json({
        response:{
          error:"",
          data:reservationsShelduler.map((item)=>({
            id: item.id,
            idReservationType: item.idReservationType,
            date: item.date,
            time: item.time,
          }))
        }
      })
    } catch (error) {
      res.status(404).json({
        response:{
          error
        }
      })
    }
  }
}

export default ReservationTimesController;