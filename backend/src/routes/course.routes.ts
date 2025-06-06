import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { courseController } from '../controllers/course.controller';
import { upload } from '../config/multer.config';

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Управление курсами
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор курса
 *         title:
 *           type: string
 *           description: Название курса
 *         description:
 *           type: string
 *           description: Описание курса
 *         authorId:
 *           type: string
 *           description: ID автора курса
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата последнего обновления
 *     CourseCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Название курса
 *         description:
 *           type: string
 *           description: Описание курса
 *     CourseUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Название курса
 *         description:
 *           type: string
 *           description: Описание курса
 */

const router = Router();
router.use(protect);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Получение списка всех курсов
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список курсов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         description: Не авторизован
 */
router.get('/', courseController.getAll);

/**
 * @swagger
 * /api/courses/completed:
 *   get:
 *     summary: Получение списка завершенных курсов
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список завершенных курсов
 *       401:
 *         description: Не авторизован
 */
router.get('/completed', courseController.getCompletedCourses);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Получение инфо по курсу
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: информация по курсу
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         description: Не авторизован
 */
router.get('/:id', courseController.getById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Создание нового курса
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseCreate'
 *     responses:
 *       201:
 *         description: Курс успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав для создания курса
 */
router.post(
  '/',
  restrictTo(['ADMIN'], ['AUTHOR']),
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `theoreticalMaterial_${i}`,
      maxCount: 1,
    })),
  ]),
  courseController.create,
);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Удаление курса
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     responses:
 *       204:
 *         description: Курс успешно удален
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав для удаления курса
 *       404:
 *         description: Курс не найден
 */
router.delete(
  '/:id',
  restrictTo(['ADMIN'], ['AUTHOR']),
  courseController.delete,
);

/**
 * @swagger
 * /api/courses/{id}/learn:
 *   get:
 *     summary: Получение курса для обучения
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Курс для обучения
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Курс не найден
 */
router.get('/:id/learn', courseController.getCourseForLearning);

/**
 * @swagger
 * /api/courses/{id}/start:
 *   post:
 *     summary: Начать прохождение курса
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     responses:
 *       201:
 *         description: Курс начат
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Курс не найден
 */
router.post('/:id/start', courseController.startCourse);

/**
 * @swagger
 * /api/courses/blocks/{blockId}/complete:
 *   post:
 *     summary: Отметить блок как завершенный
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blockId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID блока
 *     responses:
 *       200:
 *         description: Блок завершен
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Блок не найден
 */
router.post('/blocks/:blockId/complete', courseController.completeBlock);

/**
 * @swagger
 * /api/courses/tests/{testId}/submit:
 *   post:
 *     summary: Отправить ответы на тест
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID теста
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionId
 *                     - optionId
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     optionId:
 *                       type: string
 *     responses:
 *       200:
 *         description: Результаты теста
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Тест не найден
 */
router.post('/tests/:testId/submit', courseController.submitTest);

/**
 * @swagger
 * /api/courses/{id}/progress:
 *   get:
 *     summary: Получение прогресса по курсу
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Прогресс по курсу
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Курс не найден
 */
router.get('/:id/progress', courseController.getCourseProgress);

export const courseRouter = router;
