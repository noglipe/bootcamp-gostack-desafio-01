const express = require("express");

//Configurações do express:
const server = express();
server.listen(3012);
server.use(express.json());

const projects = [];

//Adicionar Projetos
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const addProjeto = {
    id,
    title,
    tasks: []
  };

  projects.push(addProjeto);
  return res.json(projects);
});

//Adicionar tarefa ao projeto
server.post("/projects/:index/:tasks/", (req, res) => {
  //Percorrer todos os projetos cadastrados para alterar somente o de id específico
  for (var project of projects) {
    if (project.id === req.params.index) {
      project.tasks.push(req.params.tasks);
    }
  }

  return res.json(projects);
});
