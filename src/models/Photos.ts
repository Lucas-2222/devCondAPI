import { model, Schema, connection, Model } from "mongoose";

const modelSchema = new Schema({
  name: String,
  id: String,
  idPhoto: String,
  title: String,
})

const modelName = "photos"

const Photos = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName]
  }else{
    return model(modelName, modelSchema);
  }
}

export default Photos;