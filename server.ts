require("dotenv").config();
import express, {Request, Response} from 'express';
import path from 'path';
import router from './src/routes';
import { connect, connection } from 'mongoose';
import cors from 'cors';
import fileupload from 'express-fileupload';
import https from 'https';
import fs from 'fs';

connect(process.env.DATABASE as string)
connection.on('error', (error: string)=> {
  console.log('erro: ', error)
})

const server = express();

const options = {
  key: fs.readFileSync("./certificado.key"),
  cert: fs.readFileSync("./certificado.cert")
};

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(path.join(__dirname,'public')));
server.use('/', router);
server.use((req: Request, res: Response) =>{
  res.status(404).send('Página nao encontrada!');
})
server.listen(process.env.PORT,()=>{
  console.log(`Rodando na porta ${process.env.BASE}`);
})

//Para conexao https
// https.createServer(options, server).listen(3000 , '192.168.0.105' ,() => {
//     console.log(`Rodando na porta ${process.env.BASE}`);
// });