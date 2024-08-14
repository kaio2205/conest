// processso de renderizaçao  clientes 




// mudar propriedades do documentos para iniciar (UX)


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreate.disable = true
    btnUpdate.disable = true
    btnDelete.disable = true
})



// Alterar comportamento do ENTER (relacionar ao botao de busca)

// function teclaenter(event) {
    // if (event.key === 'Enter') {
        // event.preventDefault()
        // executar a funcao associada ao botao buscar
        // buscarCliente()
    // }
// }


// adicionar a funçao de manipulaçao da tecla enter 

// document.getElementById('frmCliente').addEventListener('keydown', teclaenter)

// Funçao para remover  o manipulador  de eventos da tecla enter 

// function removerTeclaEnter() {
    // document.getElementById('frmCliente').removeEventListener('keydown', teclaenter)
// }




// CRUD CREAT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// captura os imputs do formulario  (passo 1 - slides)

let formCliente = document.getElementById('frmCliente')

let nomeCliente = document.getElementById('inputNameClient')

let foneCliente = document.getElementById('inputPhoneClient')

let emailCliente = document.getElementById('inputEmailClient')

let idCliente = document.getElementById ('inputId')

// evento relacionado ao botao adicionar  (passo1 - slide)

formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    // empacotar dados em um objeto e enviar ao main.js (passo2 -slide)
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value


    }

    api.newClient(cliente)

    // LIMPPAR OS DADOS DO FORM  APOS ENVIO
    formCliente.reset()

})




// CRUD READ>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// array vetor usado na renderizaçao dis dados do cliente  
let arrayCliente = []

// funçao que vai enviar ao main um pedido  de busca de dados  de um cliente pelo nome 
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value.trim()
    if (nomeCliente === "") {

        // validar canoi obrigatorio 
        api.infoSearchDialogDialog()
    } else {
        // enviar o pedido de busca com o nome do cliente 
        api.searchClient(nomeCliente)
    }

    // FOCO  no campo de busca (UX)
    api.focusClient(() => {
        document.getElementById('inputSearch').focus()
    })

    // setar o nome do cliente e habilitar o recadastramento 
    api.nameClient(() => {
        // restaurar o comportamento padrao  da tleca enter 
        removerTeclaEnter()
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById(inputNameClient).value = setarNomeCliente
        document.getElementById('inputSearch').value = setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disable = true
        document.getElementById('inputNameClient').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })

    // limpar a caixa de busca e setar o foco 

    api.clearSearch((args) => {
        document.getElementById('inputSearch').value
        document.getElementById('inputSearch').focus()
    })

    // receber do main.js os dados do client (passo 4)
    api.dataClient((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(dadosCliente)
    

    // passo 5 final percorrer o array  extrair os dados e setar os campos de texto caixa Input

    arrayCliente.forEach((c) => {
            document.getElementById('inputId').value = c._id,
            document.getElementById('inputNameClient').value = c.nomeCliente,
            document.getElementById('inputPhoneClient').value = c.foneCliente,
            document.getElementById('inputEmailClient').value = c.emailCliente
        // limpar a caixa de busca (UX)
        document.getElementById('inputSearch').value = ""
        // ativar os botoes  update e delete 
        document.getElementById('btnUpdate').disable = false
        document.getElementById('btnDelete').disable = false

    })
    })

}







// CRUD UPDATE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function editarCliente(){
const cliente ={
        idCli: idCliente.value,
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    console.log(cliente);


// passo 2 enviar o objeto cliente a o main js 

api.updateClient(cliente)

}











// CRUD DELET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function  excluirCliente(){
     // passo 1 obter obter o id do cliente
    let idCli = idCliente.value
    console.log(idCli)
    api.deleteClient(idCli)
}






















// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Reset do formulario 
function resetform() {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('inputSearch').focus()
        document.getElementById('inputSearch').disable = true
        btnCreate.disabled = true
        btnUpdate.disabled = true
        btnDelete.disabled = true
        btnRead.disable = false
        btnRead.disabled = true
        // document.getElementById("frmCliente").addEventListener("keydown", teclaenter)
        


    })
}