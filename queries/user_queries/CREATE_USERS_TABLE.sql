CREATE TABLE IF NOT EXISTS expense_tracker.users(
    id uuid PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verify_otp VARCHAR DEFAULT '',
    verify_otp_expire_at BIGINT DEFAULT 0,
    is_account_verified BOOLEAN DEFAULT FALSE,
    reset_otp VARCHAR DEFAULT '',
    reset_otp_expire_at BIGINT DEFAULT 0
)