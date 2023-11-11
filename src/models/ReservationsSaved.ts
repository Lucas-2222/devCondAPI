import { model, Model, connection, Schema } from "mongoose";

const modelSchema = new Schema({
  id: String,
  idReservationType: String,
  idUser: String,
  date: Date,
  time: String
});

const modelName = 'reservationsSaved';

const ReservationsSaved = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName]
  } else {
    return model(modelName, modelSchema)
  }
};

export default ReservationsSaved;

