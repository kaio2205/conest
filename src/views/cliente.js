// processso de renderizaçao  clientes 









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









// CRUD UPDATE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>














// CRUD DELET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>