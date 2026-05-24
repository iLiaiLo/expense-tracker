DELETE FROM expense_tracker.users
WHERE deleted_at < NOW() - INTERVAL '3 minutes' AND is_deleted=true;