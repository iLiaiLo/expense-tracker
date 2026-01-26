# Expense Tracker

A comprehensive backend application for managing personal expenses with user authentication, expense tracking, and account management features.

## Features

- **User Authentication**
  - User registration and login
  - Email verification with OTP
  - Password reset functionality
  - JWT token-based authentication
  - Secure session management

- **Expense Management**
  - Create, read, update, and delete expenses
  - Filter expenses by category
  - View all expenses
  - Organized expense tracking

- **Security**
  - Password hashing and encryption
  - OTP-based email verification
  - JWT token verification
  - Input validation and sanitization
  - Secure logout mechanism

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v22.0 or higher)
- npm or yarn
- A relational database (PostgreSQL)
- Nodemailer-compatible email service

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and configure:
   ```
    PORT=your_server_port
    USER=your_database_username
    HOST="localhost"
    DATABASE=your_database_name
    PASSWORD=your_db_password
    DB_PORT=your_db_port
    JWT_SECRET_KEY=your_secret_key

    SENDER_EMAIL=sender_email@gmail.com
    SENDER_PASSWORD=google_verification_16characters_key

   ```

4. **Database Setup**
   - Create the database schema using the SQL files in `queries/schemas/`
   - Run migration scripts to create necessary tables

5. **Start the server**
   ```bash
   npm start
   ```

## Project Structure

```
server/
├── index.js                           # Main application entry point
├── package.json                       # Project dependencies
├── controllers/                       # Request handlers
│   ├── expense.controllers/           # Expense-related handlers
│   │   ├── deleteRequestControllers/
│   │   ├── getRequestControllers/
│   │   ├── postRequestControllers/
│   │   └── putRequestControllers/
│   └── user.auth.controllers/         # User authentication handlers
├── db/
│   └── connection.js                  # Database connection setup
├── errorHandlers/
│   └── error.handler.js               # Centralized error handling
├── middlewares/                       # Express middleware
│   ├── login/                         # Login validation & token generation
│   ├── logout/                        # Logout handling
│   ├── reset.otp/                     # Password reset OTP
│   ├── reset.password/                # Password reset logic
│   ├── signup/                        # Registration validation & email
│   ├── validation/                    # Input validation
│   ├── verify.email/                  # Email verification
│   ├── verify.otp/                    # OTP verification
│   └── verify.token/                  # JWT token verification
├── queries/                           # SQL query files
│   ├── expense_queries/               # Expense-related queries
│   ├── schemas/                       # Database schemas
│   └── user_queries/                  # User-related queries
├── routes/                            # API route definitions
│   ├── authRoutes/                    # Authentication routes
│   └── expenseRoutes/                 # Expense management routes
└── utils/                             # Utility functions
    ├── getQuery.js                    # SQL query loader
    └── nodemailer.js                  # Email service setup
```

## API Endpoints

### Authentication Routes

- **POST** `/auth/signup` - Register a new user
- **POST** `/auth/login` - User login
- **POST** `/auth/logout` - User logout
- **POST** `/auth/verify-email` - Verify email with OTP
- **POST** `/auth/send-reset-otp` - Request password reset
- **POST** `/auth/verify-otp` - Verify OTP for password reset
- **POST** `/auth/reset-password` - Reset password

### Expense Routes

- **GET** `/expenses` - Retrieve all expenses
- **GET** `/expenses/:id` - Get expense by ID
- **GET** `/expenses/category/:category` - Get expenses by category
- **POST** `/expenses` - Create a new expense
- **PUT** `/expenses/:id` - Update an expense
- **DELETE** `/expenses/:id` - Delete an expense

## Middleware Overview

### Authentication Middleware
- `verifyToken.js` - Validates JWT tokens on protected routes

### Signup Middleware
- Validates signup form fields
- Checks for duplicate email/username
- Generates JWT token after successful registration
- Sends verification email

### Login Middleware
- Validates login credentials
- Verifies user password
- Generates JWT token after successful login

### Email Verification Middleware
- Sends OTP to user email
- Verifies OTP authenticity
- Updates user account verification status

### Password Reset Middleware
- Sends reset OTP to registered email
- Validates reset OTP
- Updates user password securely

## Database Schema

### Users Table
- id uuid PRIMARY KEY NOT NULL,
- username VARCHAR(255) NOT NULL,
- email VARCHAR(255) UNIQUE NOT NULL,
- password VARCHAR(255) NOT NULL,
- verify_otp VARCHAR DEFAULT '',
- verify_otp_expire_at BIGINT DEFAULT 0,
- is_account_verified BOOLEAN DEFAULT FALSE,
- reset_otp VARCHAR DEFAULT '',
- reset_otp_expire_at BIGINT DEFAULT 0

### Expenses Table
- id uuid PRIMARY KEY NOT NULL,
- user_id uuid NOT NULL,
- category VARCHAR(50) NOT NULL,
- description TEXT NOT NULL,
- amount DECIMAL(12,2) NOT NULL,
- color VARCHAR(7) NOT NULL,
- currency expense_tracker.currency_type DEFAULT '$',
- created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
- CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES expense_tracker.users(id)
    ON DELETE CASCADE

## Error Handling

The application includes centralized error handling via `error.handler.js` that manages:
- Validation errors
- Authentication errors
- Database errors
- Server errors

All errors are returned in a consistent JSON format with appropriate HTTP status codes.


## Configuration

### Email Service (Nodemailer)
The application uses Nodemailer for sending verification and reset emails. Configure your email credentials in the `.env` file.

### JWT Secret
Ensure you set a strong `JWT_SECRET` in your environment variables for token generation and verification.

## Development

### Dependencies
- Express.js - Web framework
- jsonwebtoken - JWT authentication
- bcrypt - Password hashing
- nodemailer - Email service
- pg- Database drivers
- dotenv - Environment variable management


## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push to the repository
6. Submit a pull request

## Security Best Practices

- Always use HTTPS in production
- Keep JWT secret secure
- Validate and sanitize all user inputs
- Use environment variables for sensitive data
- Implement rate limiting on authentication endpoints
- Regularly update dependencies

## Support

For issues or questions, please open an issue in the repository or contact the development team.


