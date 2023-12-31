import { model, Model, connection, Schema } from "mongoose";

const modelSchema = new Schema({
  idReservationType: String,
  id: String,
  initialHour: String,
  finalHour: String
});

const modelName = 'reservationsTimes';

const ReservationsTimes = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName]
  } else {
    return model(modelName, modelSchema)
  }
};

export default ReservationsTimes;
