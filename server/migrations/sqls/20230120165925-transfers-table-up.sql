CREATE TABLE IF NOT EXISTS transfers (
    id SERIAL PRIMARY KEY,
    sender_id  INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    balance NUMERIC(19,2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT sender_customers_transfers_foreign FOREIGN KEY (sender_id) REFERENCES customers(id) ON DELETE CASCADE,
    CONSTRAINT receiver_customers_transfers_foreign FOREIGN KEY (receiver_id) REFERENCES customers(id) ON DELETE CASCADE  
);


