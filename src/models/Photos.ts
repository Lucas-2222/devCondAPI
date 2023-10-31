import { model, Schema, connection, Model } from "mongoose";

const modelScrema = new Schema({
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
    return model(modelName, modelScrema);
  }
}

export default Photos;