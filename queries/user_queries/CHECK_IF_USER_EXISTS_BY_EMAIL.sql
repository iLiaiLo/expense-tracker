SELECT EXISTS(
    SELECT 1 FROM expense_tracker.users 
    WHERE email = $1
);