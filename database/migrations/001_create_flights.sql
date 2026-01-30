-- migrations/001_create_flights.sql
CREATE TABLE flights (
    flight_id VARCHAR(20) NOT NULL,
    flight_date DATE NOT NULL,
    tail_number VARCHAR(10) NOT NULL,
    ac_type VARCHAR(10) NOT NULL,
    std TIMESTAMP NOT NULL,
    sta TIMESTAMP NOT NULL,
    atd TIMESTAMP NOT NULL,
    ata TIMESTAMP NOT NULL,
    origin VARCHAR(10),
    destination VARCHAR(10),
    commercial_ind BOOLEAN DEFAULT TRUE,
    block_hours DECIMAL(5,2) GENERATED ALWAYS AS (
        EXTRACT(EPOCH FROM (ata - atd)) / 3600
    ) STORED,
    delay_minutes INTEGER GENERATED ALWAYS AS (
        GREATEST(0, EXTRACT(EPOCH FROM (atd - std)) / 60)
    ) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (flight_id, flight_date)
);

CREATE INDEX idx_flights_date ON flights(flight_date);
CREATE INDEX idx_flights_tail ON flights(tail_number);
CREATE INDEX idx_flights_commercial ON flights(flight_date, commercial_ind);
