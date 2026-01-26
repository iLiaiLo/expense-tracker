SELECT EXISTS(
    SELECT 1 FROM expense_tracker.users 
    WHERE username = $1
);