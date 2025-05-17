import { Router } from 'express';
import { USER_ROLES } from '@prisma/client';
import { authorshipRequestController } from '../controllers/authorshipRequest.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Authorship Requests
 *   description: Управление запросами на получение прав автора
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthorshipRequest:
 *       type: object
 *       required:
 *         - userId
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор запроса
 *         userId:
 *           type: string
 *           description: ID пользователя, подавшего запрос
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *           description: Статус запроса
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания запроса
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата последнего обновления
 *     AuthorshipRequestCreate:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Сообщение с обоснованием запроса
 *     AuthorshipRequestUpdate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [APPROVED, REJECTED]
 *           description: Новый статус запроса
 *         message:
 *           type: string
 *           description: Сообщение с причиной решения
 */

const router = Router();
router.use(protect);

/**
 * @swagger
 * /api/authorship/request:
 *   post:
 *     summary: Создание запроса на получение прав автора
 *     tags: [Authorship Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorshipRequestCreate'
 *     responses:
 *       201:
 *         description: Запрос успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorshipRequest'
 *       401:
 *         description: Не авторизован
 *       400:
 *         description: Неверные данные запроса
 */
router.post('/', authorshipRequestController.create);

/**
 * @swagger
 * /api/authorship/request:
 *   get:
 *     summary: Получение всех запросов на авторство (только для администраторов)
 *     tags: [Authorship Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список запросов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuthorshipRequest'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав для просмотра запросов
 */
router.get(
  '/',
  restrictTo([USER_ROLES.ADMIN]),
  authorshipRequestController.getAll,
);

/**
 * @swagger
 * /api/authorship/request/me:
 *   get:
 *     summary: Получение запроса на авторство текущего пользователя
 *     tags: [Authorship Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Запрос пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorshipRequest'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Запрос не найден
 */
router.get('/me', authorshipRequestController.userRequest);

/**
 * @swagger
 * /api/authorship/request/{id}:
 *   patch:
 *     summary: Обновление статуса запроса на авторство (только для администраторов)
 *     tags: [Authorship Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID запроса
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorshipRequestUpdate'
 *     responses:
 *       200:
 *         description: Статус запроса обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorshipRequest'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав для обновления запроса
 *       404:
 *         description: Запрос не найден
 */
router.patch(
  '/:id',
  restrictTo([USER_ROLES.ADMIN]),
  authorshipRequestController.updateStatus,
);

export const authorshipRequestRouter = router;
