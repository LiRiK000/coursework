import { Router } from 'express';
import { sectionController } from '../controllers/section.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: Управление разделами курсов
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Section:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - courseId
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор раздела
 *         title:
 *           type: string
 *           description: Название раздела
 *         content:
 *           type: string
 *           description: Содержимое раздела
 *         courseId:
 *           type: string
 *           description: ID курса, к которому относится раздел
 *         order:
 *           type: integer
 *           description: Порядковый номер раздела
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата последнего обновления
 *     SectionCreate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Название раздела
 *         content:
 *           type: string
 *           description: Содержимое раздела
 *         order:
 *           type: integer
 *           description: Порядковый номер раздела
 *     SectionUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Название раздела
 *         content:
 *           type: string
 *           description: Содержимое раздела
 *         order:
 *           type: integer
 *           description: Порядковый номер раздела
 */

const router = Router();
router.use(protect);

/**
 * @swagger
 * /api/sections/courses/{courseId}/sections:
 *   post:
 *     summary: Создание нового раздела в курсе
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SectionCreate'
 *     responses:
 *       201:
 *         description: Раздел успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав для создания раздела
 *       404:
 *         description: Курс не найден
 */
router.post(
  '/courses/:courseId/sections',
  restrictTo(['AUTHOR', 'ADMIN']),
  sectionController.create,
);

/**
 * @swagger
 * /api/sections/courses/{courseId}/sections:
 *   get:
 *     summary: Получение всех разделов курса
 *     tags: [Sections]
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
 *         description: Список разделов курса
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Section'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Курс не найден
 */
router.get('/courses/:courseId/sections', sectionController.getAll);

/**
 * @swagger
 * /api/sections/sections/{id}:
 *   get:
 *     summary: Получение раздела по ID
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID раздела
 *     responses:
 *       200:
 *         description: Информация о разделе
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Раздел не найден
 */
router.get('/sections/:id', sectionController.getById);

/**
 * @swagger
 * /api/sections/sections/{id}:
 *   patch:
 *     summary: Обновление раздела
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID раздела
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SectionUpdate'
 *     responses:
 *       200:
 *         description: Раздел успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав для обновления раздела
 *       404:
 *         description: Раздел не найден
 */
router.patch(
  '/sections/:id',
  restrictTo(['AUTHOR', 'ADMIN']),
  sectionController.update,
);

/**
 * @swagger
 * /api/sections/sections/{id}:
 *   delete:
 *     summary: Удаление раздела
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID раздела
 *     responses:
 *       204:
 *         description: Раздел успешно удален
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав для удаления раздела
 *       404:
 *         description: Раздел не найден
 */
router.delete(
  '/sections/:id',
  restrictTo(['AUTHOR', 'ADMIN']),
  sectionController.delete,
);

export const sectionRouter = router;
