import { Router } from 'express';
import { favoriteController } from '../controllers/favorite.controller';
import { protect } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Управление избранными курсами
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteCourse:
 *       type: object
 *       required:
 *         - courseId
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор записи
 *         courseId:
 *           type: string
 *           description: ID курса
 *         userId:
 *           type: string
 *           description: ID пользователя
 *         course:
 *           $ref: '#/components/schemas/Course'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата добавления в избранное
 */

const router = Router();
router.use(protect);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Получение списка избранных курсов пользователя
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список избранных курсов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteCourse'
 *       401:
 *         description: Не авторизован
 */
router.get('/', favoriteController.getFavoriteCourses);

/**
 * @swagger
 * /api/favorites/{courseId}:
 *   post:
 *     summary: Добавление/удаление курса из избранного
 *     tags: [Favorites]
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
 *         description: Статус избранного обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFavorite:
 *                   type: boolean
 *                   description: Текущий статус избранного
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Курс не найден
 */
router.post('/:courseId', favoriteController.toggleFavorite);

export const favoriteRouter = router;
