# 📝 Blog Application Backend

A RESTful Blog Application Backend built with **Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL**. The project focuses on secure authentication, blog post and comment management, relational database design, and maintainable backend architecture.

The application follows a modular, layered architecture to keep business logic organized, improve maintainability, and support future enhancements.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login.
- JWT-based authentication using access and refresh tokens.
- Protected routes using authentication middleware.
- Token refresh and logout functionality.
- Authorization checks for protected resources.

### 📝 Blog Post Management
- Create new blog posts.
- Retrieve individual posts and all posts.
- Retrieve posts belonging to a specific user.
- Update existing posts.
- Delete posts.
- Restrict post modifications to their owners.

### 💬 Comment Management
- Add comments to blog posts.
- Retrieve comments associated with a post.
- Retrieve individual comments.
- Update existing comments.
- Delete comments.
- Enforce comment ownership for modification and deletion.
- Validate the relationship between posts and their comments.

### 🛡️ Validation & Error Handling
- Request validation using Zod.
- Centralized error handling.
- Authentication middleware for protected routes.
- Consistent API response structures.
- Appropriate HTTP status codes for errors and authorization failures.

### 🏗️ Backend Architecture
- Modular architecture organized by feature.
- Separation of concerns using Routes, Controllers, Services, and Repositories.
- Dependency Injection.
- Dependency Inversion Principle.
- Type-safe development using TypeScript.
- Reusable middleware and utility functions.

### 🗄️ Database Management
- PostgreSQL relational database.
- Prisma ORM for database operations.
- Relational models for users, posts, comments, and refresh tokens.
- Database relationships and referential integrity.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| TypeScript | Type safety |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and schema management |
| Zod | Request validation |
| JWT | Authentication |
| Postman | API testing |

---

## 📂 Project Structure

```text
blog-application/
├── .vscode/
├── backend/
│   ├── .agents/
│   ├── .claude/
│   ├── .vscode/
│   ├── .windsurf/
│   ├── generated/
│   ├── prisma/
│   ├── public/
│   ├── src/
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── comment/
│   │   │   └── post/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── prisma.config.ts
│   └── tsconfig.json
├── frontend/
├── .gitignore
├── LICENSE
└── README.md
```

> **Note:** This structure reflects the supplied project directory. Generated files, dependencies, and local tool configuration are omitted from the tree where appropriate.

### 📁 Important Directories

| Directory/File | Responsibility |
|---|---|
| `backend/src/modules/auth/` | Registration, login, token management, and authentication logic |
| `backend/src/modules/post/` | Blog post operations |
| `backend/src/modules/comment/` | Comment operations |
| `backend/src/middlewares/` | Authentication, validation, and request processing |
| `backend/src/lib/` | Shared infrastructure, including the Prisma client |
| `backend/src/config/` | Application configuration |
| `backend/src/types/` | Shared TypeScript types |
| `backend/src/utils/` | Reusable helpers, errors, and response utilities |
| `backend/prisma/` | Prisma schema and database migrations, if configured |
| `backend/generated/` | Generated Prisma Client |
| `backend/src/app.ts` | Express application setup |
| `backend/src/index.ts` | Application entry point |

---

## 🏗️ Architecture

The backend uses a layered architecture that separates HTTP handling, business logic, and database access.

```text
                    Client / Postman
                           |
                           v
                      Express Routes
                           |
                           v
                Authentication Middleware
                           |
                           v
                  Validation Middleware
                           |
                           v
                       Controller
                           |
                           v
                         Service
                           |
                           v
                       Repository
                           |
                           v
                       Prisma ORM
                           |
                           v
                    PostgreSQL Database
```

### Layer Responsibilities

**Routes**
- Define API endpoints and HTTP methods.
- Connect middleware to controllers.

**Middleware**
- Authenticate users.
- Validate request data.
- Process requests before controller execution.

**Controllers**
- Read request parameters and body data.
- Call the appropriate service methods.
- Return structured HTTP responses.

**Services**
- Implement business logic.
- Check resource ownership and authorization.
- Coordinate repository operations.

**Repositories**
- Execute database queries through Prisma ORM.
- Encapsulate database access.

**Prisma ORM**
- Provides type-safe database queries and schema management.

---

## ⚙️ Getting Started

### Prerequisites

Install the following before running the backend:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- npm
- Git

### 1. Clone the Repository

Replace the placeholder with your actual GitHub repository URL.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd <YOUR_PROJECT_DIRECTORY>
```

Then navigate to the backend:

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

Use `.env.example` as a reference if it contains the required variables.

Example database configuration:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
```

Configure the other environment variables required by your application, including authentication secrets and token settings.

**Security:** Never commit real database credentials, JWT secrets, or other sensitive values to GitHub.

### 4. Configure the Database

Create a PostgreSQL database for the application.

Make sure the `DATABASE_URL` in your environment configuration points to that database.

### 5. Apply Prisma Migrations

If your project uses Prisma migrations, run:

```bash
npx prisma migrate dev
```

Generate the Prisma Client if required by your configuration:

```bash
npx prisma generate
```

> **Important:** This project uses a custom Prisma Client output directory. Ensure the generator configuration and imports match the project's existing setup. Run the migration commands appropriate for your Prisma version and configuration.

### 6. Start the Development Server

Check the `scripts` section in `backend/package.json`.

If your project defines a `dev` script, start the application with:

```bash
npm run dev
```

The server will run on the port configured in your environment variables.

---

## 🔌 API Modules

The backend is organized into three main modules.

### Authentication

Supports user registration, login, token handling, and logout.

### Posts

Supports creating, retrieving, updating, and deleting blog posts.

### Comments

Supports creating, retrieving, updating, and deleting comments associated with blog posts.

For exact endpoint paths, HTTP methods, request bodies, and authentication requirements, refer to the route definitions in the source code.

---

## 🔒 Security & Authorization

Authentication and authorization serve different purposes:

- **Authentication** verifies the identity of the user.
- **Authorization** determines whether the authenticated user can perform a particular operation.

Protected operations should require a valid access token.

Post and comment update/delete operations should verify that the requested resource belongs to the appropriate user.

Comment endpoints should also validate that the supplied `postId` corresponds to the requested comment.

Requests without valid authentication credentials should be rejected by the authentication middleware.

---

## 🧪 API Testing

API endpoints can be tested using Postman.

Recommended test cases include:

| Test Scenario | Expected Behavior |
|---|---|
| Valid login credentials | Successful authentication |
| Invalid login credentials | Authentication error |
| Missing access token on protected route | `401 Unauthorized` |
| Invalid request body | Validation error |
| Retrieve an existing post | Successful response |
| Retrieve a nonexistent post | `404 Not Found` |
| Update another user's post | Access denied |
| Create a comment on an existing post | Comment created |
| Retrieve a comment using its correct post ID | Comment returned |
| Retrieve a comment using an incorrect post ID | `404 Not Found` |
| Update another user's comment | Access denied |
| Delete another user's comment | Access denied |

Actual HTTP status codes and response formats should match the implementation.

---

## 📸 Project Screenshots

Screenshots can be added here to demonstrate the implementation and testing process.

### 1. Backend Code

Show the modular folder structure and relevant backend implementation.

### 2. API Testing

Show Postman requests and responses for authentication, post management, and comment operations.

### 3. Database Design

Show PostgreSQL tables, database relationships, or the Prisma schema.

---

## 📚 Key Learnings

This project helped strengthen my understanding of:

- RESTful API development.
- Authentication using JWT access and refresh tokens.
- Authorization and resource ownership.
- Relational database design.
- Prisma ORM and PostgreSQL.
- TypeScript for maintainable backend development.
- Layered architecture and separation of concerns.
- Dependency Injection and the Dependency Inversion Principle.
- Request validation and error handling.
- API testing and edge-case verification.

---

## 🔮 Future Improvements

Potential enhancements include:

- Pagination and filtering for post and comment endpoints.
- Automated unit and integration tests.
- API documentation using Swagger/OpenAPI.
- Additional rate limiting and security hardening.
- Logging and monitoring.
- Deployment and CI/CD integration.

---

## 👨‍💻 Author

**Arish Ahmad**

GitHub: [ArishAhmad06](https://github.com/ArishAhmad06)

---

⭐ If you find this project useful, consider giving the repository a star.

**Built with Node.js, TypeScript, and a focus on backend engineering.**
