const express = require('express');
const { json } = require('body-parser');
const { createConnection } = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

const conexao = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'teste-atf'
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.post('/server', (req, res) => {
    const nome = req.body.nome;

    const sql = 'insert into new_table (nome) values (?)';
    conexao.query(sql, [nome], (error, results) => {
        if(error){
            console.error("erro ao adicionar o nome no db: " + error);
            res.status(500).send("erro");
        } else {
            console.log('nome adicionado: ' + nome);
            res.status(200).send('nome adiionado');
        }
    })
})

app.listen(PORT, () => {
    console.log(`porta ${PORT}`);
})