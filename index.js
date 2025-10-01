const express = require('express');
const fs = require('fs');
const path = require('path');
const registerRoutes = require('./utils/registerRoutes');

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
	res.send("hello");
});



// Registrar rotas automaticamente
const routerDir = path.join(__dirname, 'routers');
registerRoutes(app, routerDir);



app.listen(3000, () => {
	console.log('Servidor rodando na porta 3000');
});

module.exports = app;
