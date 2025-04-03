import { Router } from 'express';
import { generateCertificate } from '../controllers/certificate.controller';
import { protect } from '../middleware/auth.middleware';

export const certificateRouter = Router();

// Защищенный маршрут для генерации сертификата
certificateRouter.post('/generate', protect, generateCertificate);
