const { ipcRenderer, contextBridge, ipcMain } = require('electron')



// stt de conexão (verificar se o bd está conectado)
contextBridge.exposeInMainWorld('api', {
    openclient: () => ipcRenderer.send('open-client'),
    openproduto: () => ipcRenderer.send('open-produto'),
    openfornec: () => ipcRenderer.send('open-fornec'),
    openrelatorio: () => ipcRenderer.send('open-relatorio'),
    dbMessage: (message) => ipcRenderer.on('db-message',message),
    newClient: (cliente) => ipcRenderer.send('new-client',cliente),
    newFornecedor: (fornecedor)=>ipcRenderer.send('new-fornecedor',fornecedor),
    infoSearchDialog: () => ipcRenderer('dialog-infoSearchDialog'),
    focusClient: (args) => ipcRenderer.on('focus-searchClient',args),
    searchClient: (nomeCliente) => ipcRenderer.send ('search-client',nomeCliente),
    nameClient: (args) => ipcRenderer.on ('set-nameClient',args),
    clearSearch: (args) => ipcRenderer.on ('clear-search',args),
    dataClient:(dadoCliente) => ipcRenderer.on('data-client',dadoCliente),
    updateClient:(cliente) => ipcRenderer.send('update-client',cliente),
    deleteClient: (idCli)  => ipcRenderer.send ('delet-client', idCli),
    resetForm: (args) => ipcRenderer.on('reset-form', args),

    // FORNECEDOR
    infoSearchFornecedor: () => ipcRenderer('dialog-infoSearchFornecedor'),
    searchFornecedor: (nomeFornecedor) => ipcRenderer.send ('search-fornecedor',nomeFornecedor),
    nameFornecedor: (args) => ipcRenderer.on ('set-nameFornecedor',args),
    dataFornecedor:(dadosFornecedor) => ipcRenderer.on('data-Fornecedor',dadosFornecedor),
    
})

ipcRenderer.send('db-conect')




ipcRenderer.send('send-message', "Status do banco de dados:")

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

// inserir data na página
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

// interagir diretamente no DOM do documento html (index.html)
window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})