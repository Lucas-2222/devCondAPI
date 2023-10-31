import { connection, Model, model, Schema } from "mongoose";

const modelSchema = new Schema ({
  id: String,
  idWarning: String,
  dateCreated: Date,
  title: String,
  status: String,
});

const modelName = 'warnings';

const Warnings = (): Model<any>  => {
  if(connection && connection.models[modelName]) {
    return connection.models[modelName];
  } else {
    return model(modelName, modelSchema);
  }
}

export default Warnings;