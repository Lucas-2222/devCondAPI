import { model, Model, connection, Schema } from "mongoose";

const modelSchema = new Schema({
  disabledDates: String,
  id: String,
  idReservationType: String, 
});

const modelName = 'reservationsDisabled';

const ReservationsDisabled = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName]
  } else {
    return model(modelName, modelSchema)
  }
};

export default ReservationsDisabled;

