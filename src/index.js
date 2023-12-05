//importações necessárias para o projeto
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

//configurações para o servidor
app.use(bodyParser.json());
app.use(cors());

//rota para criar um item
app.post("/user", async (req, res) => {
  const dados = req.body;
  await prisma.item.create({
    data: {
      nome: dados.nome,
    },
  });
  return res.sendStatus(201);
});

//rota para listar todos os usuários
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  if(users.lenght>0) return res.status(200).send(users);
  return res.status(404).send("No users found");
});

//rota para buscar um usuário pelo nome
app.get("/user/:nome", async (req, res) => {
  const { nome } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      nome: nome,
    },
  });

  if (user) {
    return res.status(200).send(user);
  } else {
    return res.status(404).send("User not found");
  }
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});