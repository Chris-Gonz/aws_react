-- src/main/resources/import.sql

-- create table cvg if it does not exist.

CREATE TABLE IF NOT EXISTS students(
    Id SERIAL Primary KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL
);
