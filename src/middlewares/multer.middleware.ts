import { BadGatewayException, BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { error } from 'console';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import { extname } from 'path';

@Injectable()
export class uploadMiddleware implements NestMiddleware {
  private upload = multer({
    storage: multer.diskStorage({
      destination: (req,file,cb)=>{
        if(file.mimetype.startsWith('video/')){
          cb(null,'./uploads/videos');
        }
        else if(file.mimetype.startsWith('image/')){
          cb(null,'./uploads/images');
        }
        else{
          cb(new BadRequestException('Only images and videos are allowed'),'')
        }

      },
      filename: (req, file, cb) => {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, prefix + extname(file.originalname));
      },
    }),
    limits:{fileSize:100*1024*1024},
    fileFilter:(req,file,cb)=>{
      if(file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/'))
      {
        cb(null,true)
      } else {
        cb(new error('Only images and uploads are allowed'),false)
      }
    }
  }).fields([
    {name:'image' , maxCount:1},
    {name:'video' , maxCount:1}
  ]);

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err:any) => {
      if (err) {
        return res.json({ message: err.message });
      }
      next();
    });
  }
}
