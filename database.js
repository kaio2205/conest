// modulo de conexao com o banco de dados  uso do framework mongoose

// importar  a biblioteca
const mongoose = require('mongoose')

// definir o banco de dados (copiar a string do compass)
let url = "mongodb+srv://admin:Senac123@clusterconest.ro2k8z5.mongodb.net/dbconest"


// variavel  para armazernar i status da conexao
let isConnected = false 

// status da conexao 
 
const dbStatus = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// conectar 

const conectar = async () => {
    // se não estiver conectado
    if (isConnected === false) {
        try {
            await mongoose.connect(url)
            isConnected = true
            console.log("Mongodb conectado")
            return (isConnected)
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// desconectar
const desconectar = async () => {
    
    if(isConnected=== true){ 
    try {
        await mongoose.disconnect(url)
        isConnected = false
        console.log("Mongodb desconectado")
        return(isConnected)
    } catch (error) {
        console.log(`Problema detectado ${error.message}`)
    }
}
}


// exportar para o main os metodos conectar e desconectar

module.exports = { dbStatus, desconectar }