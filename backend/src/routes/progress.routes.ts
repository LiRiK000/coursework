import { Router } from 'express';
import { progressController } from '../controllers/progress.controller';
import { protect } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: Управление прогрессом прохождения курсов
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Progress:
 *       type: object
 *       required:
 *         - userId
 *         - courseId
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор записи прогресса
 *         userId:
 *           type: string
 *           description: ID пользователя
 *         courseId:
 *           type: string
 *           description: ID курса
 *         completedSections:
 *           type: array
 *           items:
 *             type: string
 *           description: Массив ID завершенных разделов
 *         score:
 *           type: number
 *           description: Общий балл за курс
 *         lastAccessedAt:
 *           type: string
 *           format: date-time
 *           description: Дата последнего доступа к курсу
 *     AnswerValidation:
 *       type: object
 *       required:
 *         - sectionId
 *         - answer
 *       properties:
 *         sectionId:
 *           type: string
 *           description: ID раздела
 *         answer:
 *           type: string
 *           description: Ответ пользователя
 *     AnswerValidationResponse:
 *       type: object
 *       properties:
 *         isCorrect:
 *           type: boolean
 *           description: Правильность ответа
 *         score:
 *           type: number
 *           description: Полученные баллы
 *         feedback:
 *           type: string
 *           description: Комментарий к ответу
 */

const router = Router();
router.use(protect);

/**
 * @swagger
 * /api/progress/progress/validate:
 *   post:
 *     summary: Проверка ответа на задание
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerValidation'
 *     responses:
 *       200:
 *         description: Результат проверки ответа
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnswerValidationResponse'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Раздел не найден
 */
router.post('/progress/validate', progressController.validateAnswer);

/**
 * @swagger
 * /api/progress/courses/{courseId}/progress:
 *   get:
 *     summary: Получение прогресса прохождения курса
 *     tags: [Progress]
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
 *         description: Информация о прогрессе
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Progress'
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Курс не найден
 */
router.get('/courses/:courseId/progress', progressController.getProgress);

export const progressRouter = router;
