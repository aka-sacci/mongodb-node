const mongoose = require('mongoose')


//CONFIG MONGOOSE
mongoose.connect("mongodb://localhost/db_users")
.then(() => {
    console.log("Mongo conectado!")
})
.catch((error) => {
    console.log("Erro ao se conectar ao MongoDB: " + error)
})

//MODELS
    //users
    const userSchema = mongoose.Schema({
        nome: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        idade: {
            type: Number,
            require: false
        },
        pais: {
            type: String,
            require: false
        }
    })

    // Collection
    mongoose.model('users', userSchema)

    //Criação de usuário
    //new userSchema({
        //nome: "Lucas Sacci",
        //email: "saccilucas@gmail.com",
        //idade: 20,
        //pais: "Brasil"
    //}).save()

    module.exports = mongoose;