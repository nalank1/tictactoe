CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    location VARCHAR(100)
);

CREATE TABLE Leaderboard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    wins Integer,
    FOREIGN KEY (username) references users(username)
    
);