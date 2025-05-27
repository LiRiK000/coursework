import { Router } from 'express';
import { generateCertificate } from '../controllers/certificate.controller';
import { protect } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Certificates
 *   description: Управление сертификатами
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CertificateResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Статус операции
 *         data:
 *           type: object
 *           properties:
 *             certificateUrl:
 *               type: string
 *               description: URL для скачивания сертификата
 */

const router = Router();

/**
 * @swagger
 * /api/certificates/{courseId}:
 *   get:
 *     summary: Получение сертификата о прохождении курса
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Сертификат успешно сгенерирован
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Не авторизован
 *       400:
 *         description: Курс не завершен
 *       404:
 *         description: Курс не найден
 */
router.get('/:courseId', protect, generateCertificate);

export default router;
