// processso de renderizaçao  clientes 




// mudar propriedades do documentos para iniciar (UX)


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreat.disable = true
    btnUpdate.disable = true
    btnDelete.disable = true
})


// Alterar comportamento do ENTER (relacionar ao botao de busca)

document.getElementById('frmCliente').addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        // executar a funcao associada ao botao buscar
        buscarCliente()
    }
})





// CRUD CREAT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// captura os imputs do formulario  (passo 1 - slides)

let formCliente = document.getElementById('frmCliente')

let nomeCliente = document.getElementById('inputNameClient')

let foneCliente = document.getElementById('inputPhoneClient')

let emailCliente = document.getElementById('inputEmailClient')

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
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })

    // setar o nome do cliente e habilitar o recadastramento 
    api.namecliet((args) => {
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById(inputNameClient).value = setarNomeCliente

        document.getElementById('inputSearch').value = setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disable = true
        document.getElementById('inputNameClient').focus()
        btnRead.disabled = true
        btnCreat.disabled = false
    })

    // limpar a caixa de busca e setar o foco 

    api.clearSearch((args) => {
        document.getElementById('inputSearch').value
        document.getElementById('inputSearch').focus()

    })

}







// CRUD UPDATE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>














// CRUD DELET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// Reset do formulario 
function resetform() {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('inputSearch').focus()
        btnCreat.disabled = true
        btnUpdate.disabled = true
        btnDelete.disabled = true
        document.getElementById('inputSearch').disable = true
        btnRead.disabled = true


    })
}