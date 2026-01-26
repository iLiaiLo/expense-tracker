UPDATE expense_tracker.expenses SET category=$3, description=$4, amount=$5, color=$6, currency=$7
WHERE id=$1 AND user_id=$2 RETURNING *;