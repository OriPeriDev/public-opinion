// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('myDatabase.sqlite');

// Create table to store questions and answers
// db.serialize(() => {
//   db.run(`CREATE TABLE questions (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     question TEXT NOT NULL
//   )`);

//   db.run(`CREATE TABLE answers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     question_id INTEGER NOT NULL,
//     answer TEXT NOT NULL,
//     click_count INTEGER DEFAULT 0,
//     FOREIGN KEY (question_id) REFERENCES questions (id)
//   )`);
  
  // Initialize with some data if the tables are empty
  // db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
  //   if (err) {
  //     console.error("Error checking questions table:", err);
  //     return;
  //   }
  //   if (row.count === 0) {
  //     // Insert initial data
  //     db.run("INSERT INTO questions (question) VALUES (?)", ["What is your name?"]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [1, "My name is ChatBot."]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [1, "I'm called AI Assistant."]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [1, "You can call me Helper."]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [1, "I go by Digital Friend."]);

  //     // Add another question with 4 answers
  //     db.run("INSERT INTO questions (question) VALUES (?)", ["What is your favorite color?"]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [2, "My favorite color is blue."]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [2, "I prefer green."]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [2, "Red is my top choice."]);
  //     db.run("INSERT INTO answers (question_id, answer) VALUES (?, ?)", [2, "I like all colors equally."]);
  //   }
  // });
// });

module.exports = db;
