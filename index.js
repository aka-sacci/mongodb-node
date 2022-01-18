const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 9091

//CONFIG
    //IMPORTAÇÃO DO BANCO
    const mongo = require('./mongoConnect')

    //BODY PARSER
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

    //CORS
    app.use(cors())

//ROTAS
    //ROTA PRINCIPAL
    app.get('/', (req, res) => res.send("Olá mundo!"))

    //ROTA DE CADASTRO DE USUÁRIO
    app.post("/newUser", (req, res) => {
        const user = mongo.model('users')
        new user({
            nome: req.body.nome,
            email: req.body.email,
            idade: req.body.idade,
            pais: req.body.pais
        })
        .save()
        .then(() => {   
            res.status(200).send("Usuário inserido com sucesso!")
        })
        .catch((err) => {
            res.status(400).send("Houve um erro ao inserir o usuário: " + err)
        })
    })     

    //ROTA DE MOSTRAR USUÁRIOS
    app.get("/users", (req, res) => {
        const users = mongo.model('users')
        users.find()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(400).send("Houve um erro ao recuperar os usuários: " + err)
        })
    })

//SERVIDOR
app.listen(port, () => console.log('Servidor rodando na porta ' + port))
