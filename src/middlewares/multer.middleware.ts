import { Injectable, NestMiddleware } from '@nestjs/common';
import { error } from 'console';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import { extname } from 'path';

@Injectable()
export class uploadMiddleware implements NestMiddleware {
  private upload = multer({
    storage: multer.diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, prefix + extname(file.originalname));
      },
    }),
  }).single('image');

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err) => {
      if (err) {
        return res.json({ message: err.message });
      }
      next();
    });
  }
}
