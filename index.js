const express = require("express");

//Configurações do express:
const server = express();
server.listen(3012);
server.use(express.json());

const projects = [];
let contReq = 0;

//Middlewares para verificar a existencia do projeto
function checkIdInArray(req, res, next) {
  const project = projects.find(project => project.id === req.params.id);
  if (!project) {
    return res.status(400).json({ error: "Projeto Não Existe!" });
  }
  return next();
}

//Middlewares para impedir dois projetos com mesmo ID
function checkIdInArrayPost(req, res, next) {
  const project = projects.find(project => project.id === req.body.id);
  if (project) {
    return res
      .status(400)
      .json({ error: `Já Existe o Projeto de ID: ${req.body.id}!` });
  }
  return next();
}

//Middlewares para realizar a contagem de requisições
function contRequisicao(req, res, next) {
  contReq++;
  console.log(contReq);
  return next();
}

//Adicionar Projetos
server.post("/projects", contRequisicao, checkIdInArrayPost, (req, res) => {
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
server.post(
  "/projects/:id/:tasks/",
  contRequisicao,
  checkIdInArrayPost,
  (req, res) => {
    for (var project of projects) {
      if (project.id === req.params.id) {
        project.tasks.push(req.params.tasks);
      }
    }

    return res.json(projects);
  }
);

//Exibir projetos
server.get("/projects", contRequisicao, (req, res) => {
  return res.json(projects);
});

//Atualizar Título de Projeto
server.put("/projects/:id", contRequisicao, checkIdInArray, (req, res) => {
  projects.map(project => {
    if (project.id === req.params.id) {
      project.title = req.body.title;
    }
  });

  return res.json(projects);
});

//Deletar um projeto
server.delete("/projects/:id", contRequisicao, checkIdInArray, (req, res) => {
  const delProjeto = projects.findIndex(
    project => project.id === req.params.id
  );
  projects.splice(delProjeto, 1);
  return res.json(projects);
});
