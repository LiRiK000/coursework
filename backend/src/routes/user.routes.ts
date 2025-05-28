import { Router } from 'express';
import {
  updateProfile,
  updatePassword,
  getProfile,
  resetAvatar,
  getAllUsers,
} from '../controllers/user.controller';
import { upload } from '../middleware/upload.middleware';
import { protect } from '../middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление профилем пользователя
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfileUpdate:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: Имя пользователя
 *         lastName:
 *           type: string
 *           description: Фамилия пользователя
 *         avatar:
 *           type: string
 *           format: binary
 *           description: Аватар пользователя
 *     PasswordUpdate:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           format: password
 *           description: Текущий пароль
 *         newPassword:
 *           type: string
 *           format: password
 *           description: Новый пароль
 */

export const userRouter = Router();

userRouter.use(protect);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получение списка всех пользователей
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: Не авторизован
 */
userRouter.get('/', getAllUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Получение профиля пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Не авторизован
 */
userRouter.get('/profile', getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Обновление профиля пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProfileUpdate'
 *     responses:
 *       200:
 *         description: Профиль успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Не авторизован
 *       400:
 *         description: Неверные данные
 */
userRouter.patch('/profile', upload.single('avatar'), updateProfile);

/**
 * @swagger
 * /api/users/password:
 *   patch:
 *     summary: Обновление пароля пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordUpdate'
 *     responses:
 *       200:
 *         description: Пароль успешно обновлен
 *       401:
 *         description: Не авторизован
 *       400:
 *         description: Неверный текущий пароль
 */
userRouter.patch('/password', updatePassword);

/**
 * @swagger
 * /api/users/avatar:
 *   delete:
 *     summary: Сброс аватара пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Аватар успешно сброшен
 *       401:
 *         description: Не авторизован
 */
userRouter.delete('/avatar', resetAvatar);
