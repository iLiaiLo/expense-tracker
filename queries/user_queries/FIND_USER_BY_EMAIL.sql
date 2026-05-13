SELECT is_deleted, is_account_verified, reset_otp, reset_otp_expire_at, recovery_otp, recovery_otp_expire_at FROM expense_tracker.users WHERE email = $1;
