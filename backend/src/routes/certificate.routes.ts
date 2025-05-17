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
 *     CertificateRequest:
 *       type: object
 *       required:
 *         - courseId
 *       properties:
 *         courseId:
 *           type: string
 *           description: ID курса, для которого генерируется сертификат
 *     CertificateResponse:
 *       type: object
 *       properties:
 *         certificateUrl:
 *           type: string
 *           description: URL для скачивания сертификата
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           description: Дата истечения срока действия ссылки
 */

export const certificateRouter = Router();

/**
 * @swagger
 * /api/certificates/generate:
 *   post:
 *     summary: Генерация сертификата о прохождении курса
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CertificateRequest'
 *     responses:
 *       200:
 *         description: Сертификат успешно сгенерирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CertificateResponse'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Курс не пройден
 *       404:
 *         description: Курс не найден
 */
certificateRouter.post('/generate', protect, generateCertificate);
