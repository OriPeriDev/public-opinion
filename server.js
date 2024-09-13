// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};

const app = express();
const port = 5000;

app.use(auth(config));
app.use(cors());
app.use(express.json());

// Handle form submission and save to the database
app.post('/api/submit', (req, res) => {
  const { question, answers } = req.body;
  const user = req.oidc.user; // Get the authenticated user

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const userName = user.name || user.nickname || user.email || 'Anonymous';

  db.run(`INSERT INTO questions (question, user_name) VALUES (?, ?)`, [question, userName], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to save question' });
    }

    const questionId = this.lastID;

    const answerQueries = answers.map(answer => {
      return new Promise((resolve, reject) => {
        db.run(`INSERT INTO answers (question_id, answer) VALUES (?, ?)`, [questionId, answer], function(err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });

    Promise.all(answerQueries)
      .then(() => {
        res.json({ status: 'success', questionId });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to save answers' });
      });
  });
});

// Fetch all questions and answers
app.get('/api/questions', (req, res) => {
  db.all(`SELECT q.id, q.question, 
          json_group_array(
            json_object(
              'id', a.id, 
              'answer', a.answer, 
              'click_count', a.click_count
            )
          ) AS answers
          FROM questions q
          LEFT JOIN answers a ON q.id = a.question_id
          WHERE q.id = (SELECT id FROM questions ORDER BY RANDOM() LIMIT 1)
          GROUP BY q.id`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch questions' });
      return;
    }
    
    // Parse the JSON string in the answers column
    rows.forEach(row => {
      row.answers = JSON.parse(row.answers);
    });
    
    res.json(rows);
  });
});

app.post('/api/answerClicked', (req, res) => {
  const { answerId } = req.body;

  db.run(`UPDATE answers SET click_count = click_count + 1 WHERE id = ?`, [answerId], function(err) {
    if (err) {
      res.status(500).json({ error: 'Failed to update click count' });
      return;
    }
    res.json({answerId});
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
