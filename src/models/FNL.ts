import { model, Schema, Model, connection } from 'mongoose';

const modelSchema = new Schema ({
  description: String,
  photo: String,
  dateCreated: String,
  where: String,
  descriptionRec: String,
  photoRec: String,
  dateCreatedRec: String,
  whereRec: String,
  id: String
});

const modelName = 'fnlThings';

const FnlThings = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName]
  }else{
    return model(modelName, modelSchema);
  }
}

export default FnlThings;