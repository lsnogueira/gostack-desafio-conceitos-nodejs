const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repo);

  return response.json(repo);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexSearched = repositories.findIndex((item) => item.id === id);

  if (indexSearched < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const newRepo = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories[indexSearched] = newRepo;
  return response.json(newRepo);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const indexSearched = repositories.findIndex((item) => item.id === id);

  if (indexSearched < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(indexSearched, 1);
  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const indexSearched = repositories.findIndex((item) => item.id === id);

  if (indexSearched < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const repo = repositories[indexSearched];

  repo.likes++;

  repositories[indexSearched] = repo;

  return response.json(repo);
});

module.exports = app;
