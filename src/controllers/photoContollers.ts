import {Response, Request} from 'express'
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import Photos from '../models/Photos';
import { it } from 'node:test';
//import Jimp from 'jimp/*'; 'jimp'

// const addImage = async (buffer: any) => {
//   let newName = `${uuidv4()}.jpg`;
//   let tmpImg = await Jimp.read(buffer);
//   tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
//   return newName;
//}

const photos = Photos();
const PhotoControllers = {
  addPhotos: async (req:Request, res:Response) => {
    let newPhotos: any[] = [];

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    const uploadedFile = req.files.image as UploadedFile;
    if (Array.isArray(uploadedFile)) {
      for (const item of uploadedFile) {
        if(['image/jpeg', 'image/jpg', 'image/png'].includes(item.mimetype)) {
          let idPhoto = uuidv4();
          let newName = `${uuidv4()}.jpg`;
          item.mv(`${__dirname}../../../public/images/${newName}`,(err: any)=>{
            if (err) {
              return res.status(500).send(err);
            }
          })
          newPhotos.push({
            id: req.body.id,
            idPhoto,
            title: req.body.title,
            name:newName
          })
        }
      }
      photos.insertMany(newPhotos)
    }else{
      let newName = `${uuidv4()}.jpg`;
      uploadedFile.mv(`${__dirname}../../../public/images/${newName}`, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        let idPhoto = uuidv4();
        photos.create({
          id: req.body.id,
          idPhoto,
          title: req.body.title,
          name:newName
        })
      });      
    }
    res.json({
      response:{
        error:"",
        info:"Imagens inseridas com sucesso!"
      }
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

export default PhotoControllers
