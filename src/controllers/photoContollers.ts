import {Response, Request} from 'express'
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import Photos from '../models/Photos';
import path from 'path';

const photos = Photos();

const InsertPhotos = (req: Request, id: string): Promise<boolean> => {
  return new Promise((resolve, reject)=>{
    const caminho = path.join(__dirname,'../../');
    const uploadedFile = req.files?.image as UploadedFile;
    if (Array.isArray(uploadedFile)) {
      for (const item of uploadedFile) {
        if(['image/jpeg', 'image/jpg', 'image/png'].includes(item.mimetype)) {
          let idPhoto = uuidv4();
          let newName = `${uuidv4()}.jpg`;
          item.mv(`${caminho}/public/images/${newName}`,(err: any)=>{
            if (err) {
             reject(err)
            }
          })
          photos.create({
            id,
            idPhoto,
            title: req.body.title,
            name:newName
          })
          resolve(true);
        }
      }
    }else{
      let newName = `${uuidv4()}.jpg`;
      uploadedFile.mv(`${caminho}/public/images/${newName}`, (err) => {
        if (err) {
          reject(err)
        }
        let idPhoto = uuidv4();
        photos.create({
          id,
          idPhoto,
          title: req.body.title,
          name:newName
        })
        resolve(true);
      });      
    }
  })
}

const PhotoControllers = {
  addPhotos: async (req:Request, res:Response) => {
    const uuid = uuidv4()
    InsertPhotos(req, uuid)
      .then(()=>{
        res.json({
          response:{
            error:"",
            info:"Imagens inseridas com sucesso!"
          }
        })
      })
      .catch((error)=>{
        res.status(404).json(error);
      })
  },
  getPhotos: async(req: Request, res: Response) => {
    try {
      const photo = await photos.find({id: req.query.id})
      if(photo){
        res.json(photo)
      }else{
        res.status(404).json(photo)
      }
    } catch (error) {
      res.status(404).json(error)
    }
  }
}

export {PhotoControllers, InsertPhotos}