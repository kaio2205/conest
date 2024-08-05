// processso de renderizaçao  clientes 

const Fornecedor = require("../models/Fornecedor")









// CRUD CREAT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// captura os imputs do formulario  (passo 1 - slides)

let formFornec = document.getElementById('frmFornecedor')

let razaosocialfornec = document.getElementById('inputRazao')

let cnpjFornec = document.getElementById('inputCnpj')

let  phoneFornec = document.getElementById('inputPhone')

let  emailFornec = document.getElementById('inputAdrres')

let  cepFornec = document.getElementById('inputCep')

let  logradouroFornec = document.getElementById('inputLogradouro')

let  numeroFornec = document.getElementById('inputNumber')

let bairroFornec = document.getElementById('inputBairro')

let  cidadeFornec = document.getElementById('inputCidade')




// evento relacionado ao botao adicionar  (passo1 - slide)

formFornec.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(razaosocialfornec.value, cnpjFornec.value, phoneFornec.value, emailFornec,cepFornec.value,logradouroFornec.value,numeroFornec.value,bairroFornec.value,cidadeFornec.value)
    // empacotar dados em um objeto e enviar ao main.js (passo2 -slide)
    const fornecedor = {
        razaoF: razaosocialfornec.value,
        cnpjF: cnpjFornec.value,
        telefoneF: phoneFornec.value,
        emailF: emailFornec.value,
        cepF: cepFornec.value,
        logradouroF:logradouroFornec.value,
        numeroF: numeroFornec.value,
        bairroF:bairroFornec.value,
        cidadeF:cidadeFornec.value
    }

    api.newFornecedor(fornecedor)
    
// LIMPPAR OS DADOS DO FORM  APOS ENVIO
    formFornec.reset()

})

















// CRUD READ>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>









// CRUD UPDATE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>














// CRUD DELET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>