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
server.post("/projects/:id/:tasks/", (req, res) => {
  //Percorrer todos os projetos cadastrados para alterar
  //somente o de id específico
  for (var project of projects) {
    if (project.id === req.params.id) {
      project.tasks.push(req.params.tasks);
    }
  }

  return res.json(projects);
});

//Exibir projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Atualizar Título de Projeto
server.put("/projects/:id", (req, res) => {
  for (var project of projects) {
    if (project.id === req.params.id) {
      project.title = req.body.title;
    }
  }
  return res.json(projects);
});
