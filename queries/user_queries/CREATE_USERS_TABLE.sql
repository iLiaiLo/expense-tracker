CREATE TABLE IF NOT EXISTS expense_tracker.users(
    id uuid PRIMARY KEY NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verify_otp VARCHAR(6) DEFAULT '' NOT NULL,
    verify_otp_expire_at BIGINT DEFAULT 0 NOT NULL,
    is_account_verified BOOLEAN DEFAULT FALSE NOT NULL,
    reset_otp VARCHAR(6) DEFAULT '' NOT NULL,
    reset_otp_expire_at BIGINT DEFAULT 0 NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
    recovery_otp VARCHAR(6) DEFAULT '' NOT NULL,
    recovery_otp_expire_at BIGINT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMPTZ DEFAULT NULL,

    CONSTRAINT valid_username CHECK (username ~ '^(?=.+[A-Za-z]).{3,}$'),
    CONSTRAINT valid_email CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    CONSTRAINT valid_password CHECK (LENGTH(TRIM(password))>=6),
    CONSTRAINT otp_only_numbers CHECK (verify_otp ~ '^[0-9]{6}$' OR verify_otp=''),
    CONSTRAINT reset_otp_only_numbers CHECK (reset_otp ~ '^[0-9]{6}$' OR reset_otp=''),
    CONSTRAINT recovery_otp_only_numbers CHECK (recovery_otp ~ '^[0-9]{6}$' OR recovery_otp='')
);

