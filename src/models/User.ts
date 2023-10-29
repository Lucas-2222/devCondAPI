import {Schema, model, connection, Model} from 'mongoose';

const modelSchema = new Schema({ 
    token: String,
    id: String,
    name: String,
    email: String,
    cpf: String,
    password: String,
    age: Number,
    hash: String
});

const modelName = 'users';

const Users = (): Model<any> => {
    if(connection && connection.models[modelName]) {
        return connection.models[modelName];
    } else {
        return model(modelName, modelSchema);
    }  
}

export default Users;