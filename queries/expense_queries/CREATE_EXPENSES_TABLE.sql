DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'currency_type' AND n.nspname = 'expense_tracker'
  ) THEN
    CREATE TYPE expense_tracker.currency_type AS ENUM ('$','€','£','¥','₹','₩');
  END IF;
END
$$;
 
CREATE TABLE IF NOT EXISTS expense_tracker.expenses
(
    id uuid PRIMARY KEY NOT NULL,
    user_id uuid NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    color VARCHAR(7) NOT NULL,
    currency expense_tracker.currency_type DEFAULT '$',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES expense_tracker.users(id)
        ON DELETE CASCADE
);