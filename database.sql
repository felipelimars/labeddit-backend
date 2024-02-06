-- Active: 1706302335547@@127.0.0.1@3306

CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, username, email, password) VALUES
('u001', 'ciclano', 'ciclano@email.com', 'ciclano123' );

SELECT * FROM users;

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        comments INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );


INSERT INTO posts (id, creator_id, content) VALUES
('eb3d7f6c-fc78-4a27-8aca-e1637ac8903e', 'u001', 'teste' );

SELECT * FROM posts;

CREATE TABLE likes_dislikes_posts (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );


CREATE TABLE
    comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        post_id TEXT NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE FOREIGN KEY 
        (creator_id) REFERENCES users (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes_comments (
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES comments (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );

