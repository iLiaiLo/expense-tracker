export const hardDeleteQuery = `DELETE FROM expense_tracker.users
WHERE deleted_at < NOW() - INTERVAL '30 days' AND is_deleted=true;`;
