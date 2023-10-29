import {Schema, model, connection, Model} from 'mongoose';

const modelSchema = new Schema({ 
  id: String,
  idProperties: String,
  name: String,  
});

const modelName = 'properties';

const Properties = (): Model<any> => {
  if(connection && connection.models[modelName]) {
      return connection.models[modelName];
  } else {
      return model(modelName, modelSchema);
  }  
}

export default Properties;