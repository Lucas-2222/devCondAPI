import { model, Model, connection, Schema } from "mongoose";

const modelSchema = new Schema({
  cover: String,
  title: String,
  dates: String
});

const modelName = 'reservations';

const Reservations = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName]
  } else {
    return model(modelName, modelSchema)
  }
};

export default Reservations;

