/***
 * modelo de dados (model) fornecedor
 **/ 

/**
 * Modelo de dados (model) fornecedor
 */

const { model, Schema } = require('mongoose')

const fornecedorSchema = new Schema({
    razaosocialFornec: {
        type: String
    },
    cnpjFornec: {
        type: String
    },
    telefoneFornec: {
        type: String
    },
    
     emailFornec:{
        type: String
     },
     cepFornec:{
        type: String
     },
     cepFornec:{
        type: String
     },
     logradouroFornec:{
        type: String
     },
     numeroFornec:{
        type: String
     },
     bairroFornec:{
        type: String
     },
     cidadeFornec:{
        type: String
     },
     ufFornec:{
        type: String
     },
     complementoFornec:{
        type: String
     }


    
})

module.exports = model('Fornecedor', fornecedorSchema)