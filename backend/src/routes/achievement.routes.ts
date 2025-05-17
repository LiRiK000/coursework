import { Router } from 'express';
import { achievementController } from '../controllers/achievement.controller';
import { protect } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Achievements
 *   description: Управление достижениями пользователей
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор достижения
 *         title:
 *           type: string
 *           description: Название достижения
 *         description:
 *           type: string
 *           description: Описание достижения
 *         type:
 *           type: string
 *           enum: [COURSE_COMPLETION, SECTION_COMPLETION, QUIZ_COMPLETION]
 *           description: Тип достижения
 *         icon:
 *           type: string
 *           description: URL иконки достижения
 *         unlockedAt:
 *           type: string
 *           format: date-time
 *           description: Дата получения достижения
 *     AchievementCheck:
 *       type: object
 *       required:
 *         - type
 *       properties:
 *         type:
 *           type: string
 *           enum: [COURSE_COMPLETION, SECTION_COMPLETION, QUIZ_COMPLETION]
 *           description: Тип достижения для проверки
 *         courseId:
 *           type: string
 *           description: ID курса (для достижений, связанных с курсом)
 *         sectionId:
 *           type: string
 *           description: ID раздела (для достижений, связанных с разделом)
 */

const router = Router();

/**
 * @swagger
 * /api/achievements:
 *   get:
 *     summary: Получение списка достижений пользователя
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список достижений
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 *       401:
 *         description: Не авторизован
 */
router.get('/', protect, achievementController.getAchievements);

/**
 * @swagger
 * /api/achievements/check:
 *   post:
 *     summary: Проверка и обновление достижений пользователя
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AchievementCheck'
 *     responses:
 *       200:
 *         description: Достижения проверены и обновлены
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 *       401:
 *         description: Не авторизован
 *       400:
 *         description: Неверные параметры запроса
 */
router.post('/check', protect, achievementController.checkAchievements);

export const achievementRouter = router;
