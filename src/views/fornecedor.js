// processso de renderizaçao  clientes 

// CRUD CREAT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// captura os imputs do formulario  (passo 1 - slides)

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("inputSearch").focus() //foco ao iniciar
   
})




let formFornec = document.getElementById('frmFornecedor')

let razaosocialfornec = document.getElementById('inputRazao')

let cnpjFornec = document.getElementById('inputCnpj')

let phoneFornec = document.getElementById('inputPhone')

let emailFornec = document.getElementById('inputAddress')

let cepFornec = document.getElementById('inputCep')

let logradouroFornec = document.getElementById('inputLogradouro')

let numeroFornec = document.getElementById('inputNumero')

let bairroFornec = document.getElementById('inputBairro')

let cidadeFornec = document.getElementById('inputCidade')




// evento relacionado ao botao adicionar  (passo1 - slide)

formFornec.addEventListener('submit', async (event) => {
    event.preventDefault()
    // empacotar dados em um objeto e enviar ao main.js (passo2 -slide)
    const fornecedor = {
        razaoF: razaosocialfornec.value,
        cnpjF: cnpjFornec.value,
        telefoneF: phoneFornec.value,
        emailF: emailFornec.value,
        cepF: cepFornec.value,
        logradouroF: logradouroFornec.value,
        numeroF: numeroFornec.value,
        bairroF: bairroFornec.value,
        cidadeF: cidadeFornec.value
    }
    console.log(fornecedor)

    api.newFornecedor(fornecedor)

    // LIMPPAR OS DADOS DO FORM  APOS ENVIO
    formFornec.reset()

})

















// CRUD READ>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


let arrayFornecedor = []

function buscarFornecedor() {
    let nomeFornecedor = document.getElementById('inputSearch').value.trim()

    if (nomeFornecedor === "") {
        api.infoSearchFornecedor()
    } else {
        api.searchFornecedor(nomeFornecedor)
    }

    api.focusClient((args) => {
        document.getElementById('inputSearch').focus()
    })


    api.nameFornecedor(() => {
        let setarNomeFornecedor = document.getElementById('inputSearch')
        document.getElementById('inputRazao').value = setarNomeFornecedor
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disable = true
        
    })

    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })


    api.dataFornecedor((event, dadosFornecedor) => {
        arrayFornecedor = JSON.parse(dadosFornecedor)
        console.log(arrayFornecedor)
        // passo 5 final percorrer o array  extrair os dados e setar os campos de texto caixa Input

        arrayCliente.forEach((F) => {
            document.getElementById('inputId').value = F._id
            document.getElementById('inputRazao').value = F.razaosocialfornec
            document.getElementById('inputinputCnpj').value = F.cnpjFornec
            document.getElementById('inputPhone').value = F.phoneFornec
            document.getElementById('inputAddress').value = F.emailFornec
            document.getElementById('inputCep').value = F.cepFornec
            document.getElementById('inputLogradouro').value = F.logradouroFornec
            document.getElementById('inputNumero').value = F.numeroFornec
            document.getElementById('inputinputBairro').value = F.bairroFornec
            document.getElementById('inputCidade').value = F.cidadeFornec


        })
    })


}

















// CRUD UPDATE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>














// CRUD DELET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>