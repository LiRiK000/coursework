# Анализ бэкенд части приложения

## Архитектура

Приложение построено с использованием современного стека технологий:

- Node.js + TypeScript
- Express.js как веб-фреймворк
- Prisma как ORM
- PostgreSQL как база данных
- JWT для аутентификации
- Multer для загрузки файлов

### Структура проекта

```
backend/
├── src/
│   ├── controllers/        # Обработчики запросов
│   ├── services/          # Бизнес-логика
│   ├── middlewares/       # Промежуточные обработчики
│   ├── routes/            # Маршруты API
│   ├── utils/             # Вспомогательные функции
│   ├── types/             # Типы и интерфейсы
│   └── app.ts             # Инициализация приложения
├── prisma/                # Схема базы данных
└── uploads/              # Директория для загруженных файлов
```

## Основные модули

### Аутентификация (`controllers/auth.controller.ts`)

- Регистрация пользователей
- Авторизация
- Обновление токенов
- Восстановление пароля

### Курсы (`controllers/course.controller.ts`)

- CRUD операции для курсов
- Управление блоками курса
- Управление тестами
- Загрузка обложек

### Пользователи (`controllers/user.controller.ts`)

- Управление профилем
- Избранные курсы
- История обучения
- Достижения

### Тесты (`controllers/test.controller.ts`)

- Создание тестов
- Проверка ответов
- Статистика результатов
- Управление вопросами

## База данных

### Основные модели

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Achievement {
  id          String           @id @default(uuid())
  title       String
  description String
  icon        String
  type        ACHIEVEMENT_TYPE
  user        User             @relation(fields: [userId], references: [id])
  userId      String
  createdAt   DateTime         @default(now())

  @@unique([userId, type])
}

model User {
  id                String              @id @default(uuid())
  email             String              @unique
  fullname          String
  password          String
  role              USER_ROLES          @default(USER)
  refreshToken      String?
  avatar            String?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
  Course            Course[]
  Enrollment        Enrollment[]
  ProgressTracking  ProgressTracking[]
  achievements      Achievement[]
  authorshipRequest AuthorshipRequest[]
  favoriteCourses   FavoriteCourse[]

  @@map("users")
}

model Course {
  id          String           @id @default(uuid())
  title       String
  description String
  category    String
  level       String
  coverImage  String?
  blocks      Block[]
  author      User             @relation(fields: [authorId], references: [id])
  authorId    String
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  Enrollment  Enrollment[]
  favoritedBy FavoriteCourse[]
}

model Block {
  id        String   @id @default(uuid())
  title     String
  content   String
  order     Int
  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  courseId  String
  test      Test
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Test {
  id           String     @id @default(uuid())
  title        String
  description  String?
  passingScore Int
  block        Block      @relation(fields: [blockId], references: [id], onDelete: Cascade)
  blockId      String     @unique
  questions    Question[]
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}

model Question {
  id        String   @id @default(uuid())
  question  String
  test      Test     @relation(fields: [testId], references: [id], onDelete: Cascade)
  testId    String
  options   Option[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Option {
  id         String   @id @default(uuid())
  text       String
  isCorrect  Boolean
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  questionId String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Task {
  id            String   @id @default(uuid())
  question      String
  options       String[]
  correctAnswer String
  section       Section  @relation(fields: [sectionId], references: [id])
  sectionId     String
  createdAt     DateTime @default(now())
}

model Enrollment {
  user       User     @relation(fields: [userId], references: [id])
  userId     String
  course     Course   @relation(fields: [courseId], references: [id])
  courseId   String
  enrolledAt DateTime @default(now())

  @@id([userId, courseId])
}

model ProgressTracking {
  id               String    @id @default(uuid())
  user             User      @relation(fields: [userId], references: [id])
  userId           String
  section          Section   @relation(fields: [sectionId], references: [id])
  sectionId        String
  completionStatus Int       @default(0)
  completedAt      DateTime?
  createdAt        DateTime  @default(now())

  @@unique([userId, sectionId])
}

enum ACHIEVEMENT_TYPE {
  COURSE_COMPLETION
  PERFECT_SECTION
  EARLY_ADOPTER
  STREAK
}

enum USER_ROLES {
  USER
  ADMIN
  AUTHOR
}

enum REQUEST_STATUS {
  PENDING
  APPROVED
  REJECTED
}

model AuthorshipRequest {
  id        String         @id @default(uuid())
  user      User           @relation(fields: [userId], references: [id])
  userId    String
  status    REQUEST_STATUS @default(PENDING)
  message   String?
  createdAt DateTime       @default(now())
  updatedAt DateTime       @updatedAt
}

model FavoriteCourse {
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  course    Course   @relation(fields: [courseId], references: [id])
  courseId  String
  createdAt DateTime @default(now())

  @@id([userId, courseId])
  @@map("favorite_courses")
}
```

## API Endpoints

### Аутентификация

- POST /api/auth/register - регистрация
- POST /api/auth/login - вход
- POST /api/auth/refresh - обновление токена
- POST /api/auth/logout - выход

### Курсы

- GET /api/courses - получение списка курсов
- GET /api/courses/:id - получение информации о курсе
- POST /api/courses - создание курса
- PUT /api/courses/:id - обновление курса
- DELETE /api/courses/:id - удаление курса

### Блоки

- GET /api/courses/:courseId/blocks - получение блоков курса
- POST /api/courses/:courseId/blocks - создание блока
- PUT /api/blocks/:id - обновление блока
- DELETE /api/blocks/:id - удаление блока

### Тесты

- GET /api/blocks/:blockId/test - получение теста
- POST /api/blocks/:blockId/test - создание теста
- PUT /api/tests/:id - обновление теста
- DELETE /api/tests/:id - удаление теста
- POST /api/tests/:id/submit - отправка ответов

## Безопасность

### Аутентификация

- JWT токены
- Хеширование паролей
- Валидация входных данных

### Загрузка файлов

- Валидация типов файлов
- Ограничение размера
- Безопасное хранение

### Защита API

- CORS настройки
- Валидация запросов
- Обработка ошибок

## Оптимизация

### База данных

- Индексация
- Оптимизация запросов
- Кэширование
- Миграции

## Логирование

- Запись ошибок
- Мониторинг запросов
- Аудит действий
- Метрики производительности

## Потенциальные улучшения

1. Внедрение тестирования
2. Расширение системы кэширования
3. Оптимизация загрузки файлов
4. Улучшение обработки ошибок
5. Добавление документации API (Swagger)
6. Rate limiting (https://www.npmjs.com/package/express-rate-limit)
