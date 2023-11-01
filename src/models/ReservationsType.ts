import { model, Model, connection, Schema } from "mongoose";

const modelSchema = new Schema({
  cover: String,
  title: String,
  dates: String
});

const modelName = 'reservationstype';

const ReservationsType = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName]
  } else {
    return model(modelName, modelSchema)
  }
};

export default ReservationsType;

