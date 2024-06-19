// modulo de conexao com o banco de dados  uso do framework mongoose

// importar  a biblioteca
const mongoose = require('mongoose')

// definir o banco de dados (copiar a string do compass)
let url = "mongodb://admin:pti%402018@10.26.45.202:27017/?authSource=admin"


// conectar 

const conectar = async () => {
    try {
        await mongoose.connect(url)
        console.log("Mongodb conectado")
    } catch (error) {
        console.log(`Problema detectado ${error.message}`)

    }
}

// desconectar
const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("Mongodb desconectado")
    } catch (error) {
        console.log(`Problema detectado ${error.message}`)
    }
}


// exportar para o main os metodos conectar e desconectar

module.exports = { conectar, desconectar }