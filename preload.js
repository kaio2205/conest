const { ipcRenderer } = require("electron")

// status de conexao (verificar se obanco dedados esta conectado)

ipcRenderer.send('send-message',"Status do banco de dados:")

ipcRenderer.on('db-status',(event,status)=>{
    console.log(status)
})
