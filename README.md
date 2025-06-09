# Система автоматизованого чат-боту для обслуговування клієнтів з AI-підтримкою

Веб-застосунок для автоматизації спілкування між компаніями та клієнтами з використанням штучного інтелекту.

## Автор

**ПІБ:** Попович Іван Юрійович
**Група:** ФеС-42  
**Керівник:** доцент Демків Лідія Степанівна

## Загальна інформація

**Тип проєкту:** Backend API система  
**Мова програмування:** TypeScript (Node.js)  
**Фреймворки / Бібліотеки:** NestJS, MongoDB, Mongoose, OpenAI API, Mailgun, JWT

## Опис функціоналу

**Автентифікація та авторизація користувачів**  
 **Система чатів між компаніями та клієнтами**  
 **Автоматичні відповіді з AI (OpenAI)**  
 **Відправка email-повідомлень через Mailgun**  
 **Управління компаніями та користувачами**  
 **Історія повідомлень та аналітика чатів**  
 **Налаштування автоматичних відповідей**  
 **Генерація email-шаблонів з AI**

## Опис основних класів / файлів

| Клас / Файл         | Призначення                              |
| ------------------- | ---------------------------------------- |
| `main.ts`           | Точка входу NestJS додатку               |
| `app.module.ts`     | Головний модуль додатку                  |
| `ChatService`       | Логіка роботи з чатами та повідомленнями |
| `ChatController`    | REST API endpoints для чатів             |
| `UserService`       | Управління користувачами                 |
| `OpenAiService`     | Інтеграція з OpenAI API                  |
| `MailgunService`    | Відправка email через Mailgun            |
| `CompanyService`    | Управління компаніями                    |
| `chat.schema.ts`    | Схема чату для MongoDB                   |
| `message.schema.ts` | Схема повідомлення для MongoDB           |

## Як запустити проєкт

### 1. Встановлення інструментів

- Node.js v22.12.0 + Yarn
- MongoDB (локально або MongoDB Atlas)

### 2. Клонування репозиторію

```bash
git clone https://github.com/i-popovych/requesto-backend
cd backend
```

### 3. Встановлення залежностей

```bash
nvm use
yarn install
```

### 4. Створення .env файлів

```env
JWT_SECRET=
JWT_EXPIRES=
JWT_EXPIRES_ACTIVE_ACCOUNT=
DB_URI=
HTTP_PORT=
HTTP_VERSION=
NODE_ENV=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
MAILGUN_BASE_URL=
OPENAI_API_KEY=
```

### 5. Запуск

```bash
yarn start
```

## API приклади

### Автентифікація

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@company.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "admin@company.com"
  }
}
```

### Нові повідомлення

```http
POST /api/chat/message
Content-Type: application/json

{
  "from": "client@example.com",
  "companyId": "company_id",
  "message": "Hello, I need help with my order",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "data": {
    "message": "Hello, I need help with my order",
    "company": "company_id",
    "exteranlSenderEmail": "client@example.com",
    "chat": "chat_id"
  },
  "message": "Message sent successfully"
}
```

### Відповідь компанії

```http
POST /api/chat/response
Content-Type: application/json
Authorization: Bearer <token>

{
  "chatId": "chat_id",
  "companyId": "company_id",
  "message": "Thank you for contacting us! We will help you resolve this issue.",
  "responderUserId": "user_id"
}
```

### Отримати чати компанії

```http
GET /api/chat/company/:companyId
Authorization: Bearer <token>
```

**Response:**

```json
{
  "chatList": [
    {
      "chat": {
        "_id": "chat_id",
        "externalSenderEmail": "client@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "autoResponse": true
      },
      "messages": [
        {
          "message": "Hello, I need help",
          "isAutoResponse": false,
          "timestamp": "2025-06-09T10:00:00Z"
        }
      ]
    }
  ]
}
```

### Генерація AI шаблону

```http
POST /api/chat/generate-template
Content-Type: application/json
Authorization: Bearer <token>

{
  "chatId": "chat_id",
  "style": "professional",
  "exampleEmail": "Customer is asking about delivery status",
  "currentEmail": "We are checking your order status"
}
```

### Налаштування автовідповідей

```http
PUT /api/chat/settings
Content-Type: application/json
Authorization: Bearer <token>

{
  "chatId": "chat_id",
  "isAnswerAutomatically": true
}
```

### API документація

Використовуючи наступний маршрут, можна отримати доступ до Swagger документації - http://localhost:8080/api-docs

## Використані джерела / література

- [NestJS офіційна документація](https://nestjs.com/)
- [MongoDB документація](https://docs.mongodb.com/)
- [Mongoose ODM гайд](https://mongoosejs.com/)
- [OpenAI API довідник](https://platform.openai.com/docs)
- [Mailgun API документація](https://documentation.mailgun.com/)
- [TypeScript документація](https://www.typescriptlang.org/)
- [JWT.io](https://jwt.io/)
- [StackOverflow](https://stackoverflow.com/)
