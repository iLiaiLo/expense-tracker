UPDATE expense_tracker.users 
SET verify_otp='', verify_otp_expire_at=0, is_account_verified=FALSE,
reset_otp='', reset_otp_expire_at=0, is_deleted=TRUE, recovery_otp='', recovery_otp_expire_at=0,
updated_at=CURRENT_TIMESTAMP, deleted_at=CURRENT_TIMESTAMP
WHERE id = $1 AND deleted_at IS NULL
RETURNING email;