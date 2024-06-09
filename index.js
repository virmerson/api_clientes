// src/index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let clientes = [];
let nextId = 1;

// Rota para obter todos os clientes
app.get("/clientes", (req, res) => {
  res.json(clientes);
});

// Rota para obter um cliente pelo ID
app.get("/clientes/:id", (req, res) => {
  const cliente = clientes.find((c) => c.id === parseInt(req.params.id));
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).send("Cliente não encontrado");
  }
});

// Rota para adicionar um novo cliente
app.post("/clientes", (req, res) => {
  const cliente = {
    id: nextId++,
    nome: req.body.nome,
  };
  clientes.push(cliente);
  res.status(201).json(cliente);
});

// Rota para atualizar um cliente pelo ID
app.put("/clientes/:id", (req, res) => {
  const cliente = clientes.find((c) => c.id === parseInt(req.params.id));
  if (cliente) {
    cliente.nome = req.body.nome;
    res.json(cliente);
  } else {
    res.status(404).send("Cliente não encontrado");
  }
});

// Rota para excluir um cliente pelo ID
app.delete("/clientes/:id", (req, res) => {
  const clienteIndex = clientes.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (clienteIndex >= 0) {
    clientes.splice(clienteIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Cliente não encontrado");
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
