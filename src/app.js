const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories",async (request, response) => {
  return await response.json(repositories)
});

app.post("/repositories", async (request, response) => {
  const {title,url,techs } = request.body
  const repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0
  }
  await repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", async (request, response) => {
  const { url, title, techs } = request.body;
  const {id} = request.params
  
  const repositoryId = await repositories.findIndex(repository=>repository.id == id)
  if(repositoryId === -1) return response.status(400).send()
  repositories[repositoryId] = {...repositories[repositoryId],url,title,techs}
  return response.json(repositories[repositoryId])
});

app.delete("/repositories/:id", async (request, response) => {
  const { id } = request.params;
  const repositoryId = repositories.findIndex(repository => repository.id === id)
  if(repositoryId === -1) return response.status(400).send()
  await repositories.splice(repositoryId, 1);
  console.log(repositories)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
 const { id } = request.params;
 const repositoryId = repositories.findIndex(repository=>repository.id == id)
 if(repositoryId === -1) return response.status(400).send()
repositories[repositoryId].likes += 1;
 return response.json(repositories[repositoryId])
});

module.exports = app;
