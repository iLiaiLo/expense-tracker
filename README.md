# Expense Tracker

A comprehensive backend application for managing personal expenses with user authentication, expense tracking, and account management features.

## Features

- **User Authentication**
  - User registration and login
  - Email verification with OTP
  - Password reset functionality
  - Delete account functionality
  - Account recovery functionality
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
   cd expense-tracker
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
   npm run dev - for development
   ```

## API Endpoints

### Authentication Routes

- **POST** `api/user/auth/signup` - Register a new user
- **POST** `api/user/auth/login` - User login
- **POST** `api/user/auth/logout` - User logout
- **POST** `api/user/auth/refresh`- Refresh token
- **POST** `api/user/auth/send-verify-otp`- Send OTP
- **POST** `api/user/auth/verify-email` - Verify email with OTP

### Update password routes

- **POST** `api/user/password/send-reset-otp`- Send reset otp to email for updating password
- **POST** `api/user/password/update-password`- Update password using OTP

### Recover account routes

- **POST** `api/user/account/recovery/send-recovery-otp` - Send otp to user for recovering account
- **POST** `api/user/account/recovery/` - Recover account using recovery otp

### Delete account routes

- **DELETE** `api/user/account/delete/soft-delete` - soft delete of account

### User data routes

- **GET** `api/user/data`- Get user email username and verification status for UI
- **POST** `api/user/data/is-auth/` -send user authenticated status

###

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

### Delete Account Middleware

- performs soft delete of user account

### Recover Deleted Account Middleware

- Sends recovery OTP to deleted user's email
- Recover deleted account according to recovery OTP

## Database Schema

### Users Table

- id uuid PRIMARY KEY NOT NULL,
- username VARCHAR(255) UNIQUE NOT NULL,
- email VARCHAR(255) UNIQUE NOT NULL,
- password VARCHAR(255) NOT NULL,
- verify_otp VARCHAR(6) DEFAULT '' NOT NULL,
- verify_otp_expire_at BIGINT DEFAULT 0 NOT NULL,
- is_account_verified BOOLEAN DEFAULT FALSE NOT NULL,
- reset_otp VARCHAR(6) DEFAULT '' NOT NULL,
- reset_otp_expire_at BIGINT DEFAULT 0 NOT NULL,
- is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
- recovery_otp VARCHAR(6) DEFAULT '' NOT NULL,
- recovery_otp_expire_at BIGINT DEFAULT 0 NOT NULL,
- created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
- updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
- deleted_at TIMESTAMPTZ DEFAULT NULL,

- CONSTRAINT valid_username CHECK (username ~ '^(?=.+[A-Za-z]).{3,}$'),
- CONSTRAINT valid*email CHECK (email ~ '^[a-zA-Z0-9.*%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
- CONSTRAINT valid_password CHECK (LENGTH(TRIM(password))>=6),
- CONSTRAINT otp_only_numbers CHECK (verify_otp ~ '^[0-9]{6}$' OR verify_otp=''),
- CONSTRAINT reset_otp_only_numbers CHECK (reset_otp ~ '^[0-9]{6}$' OR reset_otp=''),
- CONSTRAINT recovery_otp_only_numbers CHECK (recovery_otp ~ '^[0-9]{6}$' OR recovery_otp='')

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

The application includes centralized error handling via `errorHandler.js` that manages:

- Validation errors
- Authentication errors
- Database errors
- Server errors

All errors are returned in a consistent JSON format with appropriate HTTP status codes.

errorHandler middleware receives error as its argument which represents AppError instance.
AppError class is created in appError.js file

## Configuration

### Email Service (Nodemailer)

The application uses Nodemailer for sending verification and reset emails. Configure your email credentials in the `.env` file.

### JWT Secret

Ensure you set a strong `JWT_ACCESS_KEY` and `JWT_REFRESH_KEY` in your environment variables for token generation and verification.

## Development

### Dependencies

- Express.js - Web framework
- jsonwebtoken - JWT authentication
- bcrypt - Password hashing
- nodemailer - Email service
- pg- Database drivers
- dotenv - Environment variable management

## Support

For issues or questions, please open an issue in the repository or contact me.
