SELECT username, email, is_account_verified, verify_otp, verify_otp_expire_at FROM expense_tracker.users WHERE id = $1;
