# Анализ функционала курсов

## 1. Структура курса

### 1.1 Основная информация

- Название курса
- Описание
- Категория
- Уровень сложности (начальный, средний, продвинутый)
- Обложка курса

### 1.2 Блоки курса

Каждый блок состоит из:

1. Теоретической части
   - Текст с форматированием (markdown)
   - Изображения
   - Видео
   - Ссылки на дополнительные материалы
   - файл
2. Практической части
   - Тесты
   - Задания
   - Проекты

## 2. Создание курса (мультистеп форма)

### 2.1 Шаг 1: Основная информация

- Заполнение базовой информации о курсе
- Загрузка обложки
- Выбор категории и уровня сложности

### 2.2 Шаг 2: Структура курса

- Создание блоков
- Определение порядка блоков

### 2.3 Шаг 3: Содержимое блоков

Для каждого блока:

- Создание теоретической части
- Добавление тестов

### 2.4 Шаг 4: Предпросмотр и публикация

- Предпросмотр курса
- Подтверждение
- Публикация

## 3. Прохождение курса

### 3.1 Интерфейс студента

- Прогресс прохождения (добавить в профиль)
- Навигация по блокам
- Отметка о прохождении блоков
- Система достижений (добавить новые ачивки, или дать возможность авторам создавать свои ачивки)

### 3.2 Тестирование

- Различные типы вопросов:
  - Один правильный ответ
  - Несколько правильных ответов
  - Сопоставление
- Система оценки
- Обратная связь

### 3.3 Практические задания

- Загрузка решений
- Проверка заданий
- Комментарии преподавателя
- Система оценки

## 4. Технические аспекты

### 4.1 База данных

```prisma
model Course {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  level       String
  duration    Int
  coverImage  String?
  blocks      Block[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Block {
  id          String   @id @default(cuid())
  title       String
  order       Int
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id])
  theory      Theory?
  test        Test?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Theory {
  id        String   @id @default(cuid())
  content   String   // markdown
  blockId   String   @unique
  block     Block    @relation(fields: [blockId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Test {
  id        String    @id @default(cuid())
  blockId   String    @unique
  block     Block     @relation(fields: [blockId], references: [id])
  questions Question[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Question {
  id        String   @id @default(cuid())
  type      String   // single, multiple, open, matching
  text      String
  options   Json?    // для вопросов с вариантами ответов
  answer    Json     // правильный ответ
  testId    String
  test      Test     @relation(fields: [testId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4.2 API Endpoints

```typescript
// Курсы
GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
PUT    /api/courses/:id
DELETE /api/courses/:id

// Блоки
GET    /api/courses/:courseId/blocks
POST   /api/courses/:courseId/blocks
PUT    /api/blocks/:id
DELETE /api/blocks/:id

// Теория
GET    /api/blocks/:blockId/theory
POST   /api/blocks/:blockId/theory
PUT    /api/theory/:id

// Тесты
GET    /api/blocks/:blockId/test
POST   /api/blocks/:blockId/test
PUT    /api/tests/:id
POST   /api/tests/:id/submit
```

## 5. UI/UX

### 5.1 Создание курса

- Мультистеп форма с прогресс-баром
- Drag-and-drop для блоков
- WYSIWYG редактор для теории
- Конструктор тестов

### 5.2 Прохождение курса

- Адаптивный дизайн
- Интерактивная навигация
- Визуализация прогресса
- Уведомления о новых материалах

## 6. Дополнительные функции

### 6.1 Для преподавателей

- Статистика прохождения
- Аналитика успеваемости
- Система комментариев
- Управление доступом

### 6.2 Для студентов

- Заметки
- Закладки
- Обсуждения
- Сертификаты

## 7. Следующие шаги

1. Создание базовой структуры базы данных
2. Разработка API endpoints
3. Реализация мультистеп формы создания курса
4. Разработка конструктора тестов
5. Создание интерфейса прохождения курса
6. Тестирование и оптимизация
