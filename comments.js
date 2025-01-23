// Create web server
// Create API to get all comments
// Create API to add new comment
// Create API to delete comment
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      const comments = JSON.parse(data);
      const newComment = req.body;
      newComment.id = comments.length + 1;
      comments.push(newComment);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Internal server error');
        } else {
          res.status(201).send('Comment added');
        }
      });
    }
  });
});

app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      const comments = JSON.parse(data);
      const filteredComments = comments.filter(comment => comment.id !== id);
      fs.writeFile('./comments.json', JSON.stringify(filteredComments), (err) => {
        if (err) {
          res.status(500).send('Internal server error');
        } else {
          res.status(204).send('Comment deleted');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});