const { ipcRenderer, contextBridge } = require('electron')
const Fornecedor = require('./src/models/Fornecedor')


ipcRenderer.send('db-conect')

// stt de conexão (verificar se o bd está conectado)
contextBridge.exposeInMainWorld('api', {
    openclient: () => ipcRenderer.send('open-client'),
    openproduto: () => ipcRenderer.send('open-produto'),
    openfornec: () => ipcRenderer.send('open-fornec'),
    openrelatorio: () => ipcRenderer.send('open-relatorio'),
    dbMessage: (message) => ipcRenderer.on('db-message',message),
    newClient: (cliente) => ipcRenderer.send('new-client',cliente),
    newFornecedor: (fornecedor)=>ipcRenderer.send('new-Fornecedor',fornecedor)
})






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