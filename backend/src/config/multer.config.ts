import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    let uploadPath = path.join(__dirname, '../../uploads/');

    if (file.fieldname === 'coverImage') {
      uploadPath = path.join(uploadPath, 'covers');
    } else if (file.fieldname.startsWith('theoreticalMaterial_')) {
      uploadPath = path.join(uploadPath, 'materials');
    } else {
      uploadPath = path.join(uploadPath, 'misc');
    }

    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err, '');
      cb(null, uploadPath);
    });
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  switch (true) {
    case file.fieldname === 'coverImage':
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Только изображения разрешены для обложки курса'));
      }
      break;
    case file.fieldname.startsWith('theoreticalMaterial_'):
      if (
        file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            'Только .docx файлы разрешены для теоретического материала',
          ),
        );
      }
      break;
    default:
      cb(new Error('Неизвестный тип файла'));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
