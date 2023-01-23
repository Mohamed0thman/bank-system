CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    email  VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    balance NUMERIC(19,2) NOT NULL DEFAULT 0 
);


INSERT INTO customers (email, name, balance) values ('rayford@gmail.com', 'Rayford Harrington', 2500),
('medo@gmail.com', 'Pedro Huffman', 2500),
('ronda@gmail.com', 'Ronda Todd', 5000),
('tade@gmail.com', 'Tad Hicks', 10000),
('kristy@gmail.com', 'Kristy Hays', 5000000),
('lena@gmail.com', 'Lena Lowery', 25000000),
('whitney@gmail.com', 'Whitney Richards', 460),
('clement@gmail.com', 'Clement Stone', 2530000),
('aubrey@gmail.com', 'Aubrey Hammond', 59423123),
('maura@gmail.com', 'Maura Thompson', 89900002),
('linda@gmail.com', 'Linda Christian', 1256473)