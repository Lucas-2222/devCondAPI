import  {connection, model, Schema, Model } from 'mongoose';

interface Walls {
  id: string;
  title: string;
  dateCreated: string;
  body: string;
  likes: number;
  liked: boolean;
}

const modelSchema = new Schema ({
  id: String,
  title: String,
  dateCreated: Date,
  body: String,
  likes: Number,
  liked: Boolean
})

const modelName = "Walls";

const Walls = (): Model<any> => {
  if(connection && connection.models[modelName]){
    return connection.models[modelName];
  }else{
    return model(modelName, modelSchema,);
  }
} 

export default Walls;