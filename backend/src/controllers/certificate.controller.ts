import { NextFunction, Request, Response } from 'express';
import { PDFService } from '../services/pdf.service';
import { AppError } from '../middleware/error.middleware';

export const generateCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, courseName } = req.body;
    if (!req.user || !req.user.fullname) {
      throw new AppError('User data is not available', 401);
    }
    const { fullname } = req.user;

    if (!email || !courseName) {
      throw new AppError('Не предоставлены необходимые данные', 400);
    }

    const certificateData = {
      email,
      courseName,
      fullname,
      completionDate: new Date(),
    };

    await PDFService.generateCertificate(res, certificateData);
  } catch (error) {
    next(error);
  }
};
