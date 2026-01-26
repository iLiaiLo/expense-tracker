INSERT INTO expense_tracker.expenses (id,user_id,category,description,amount,color,currency) VALUES(
    $1,$2,$3,$4,$5,$6,$7
) RETURNING *;