const { ipcMain, Menu, Shell, dialog } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const { dbStatus, desconectar } = require('./database.js')



let dbCon = null
// importaçao do Schema 
const ClientModel = require('./src/models/Cliente.js')
const fornecedorModal = require("./src/models/Fornecedor.js")
const { ok } = require('node:assert')
const { ClientRequest } = require('node:http')

let win
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/public/img/produtos.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  win.loadFile('./src/views/index.html')
}

let about



const clientWindow = () => {
  // se a janela about não estiver aberta(bug 1)
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    client = new BrowserWindow({
      width: 800, //largura
      height: 600,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      parent: father,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      modal: true

    })
  }

  client.loadFile('./src/views/clientes.html')
}


const produtoWindow = () => {

  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    produto = new BrowserWindow({
      width: 800, //largura
      height: 600,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      parent: father,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },

    })
  }

  produto.loadFile("./src/views/produtos.html")
}



const fornecWindow = () => {
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    fornec = new BrowserWindow({
      width: 1280, //largura
      height: 720,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      parent: father,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },

    })
  }

  fornec.loadFile('./src/views/fornecedor.html')

}


const relatorioWindow = () => {
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    relatorio = new BrowserWindow({
      width: 1280, //largura
      height: 720,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      icon: "",
      parent: father,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },

    })
  }

  relatorio.loadFile('./src/views/relatorio.html')

}







const aboutWindow = () => {

  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    about = new BrowserWindow({
      width: 360, //largura
      height: 220,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      icon: './src/public/img/produtos.png',
      parent: father,
      modal: true

    })
  }

  about.loadFile('./src/views/sobre.html')

}


app.whenReady().then(() => {


  ipcMain.on('db-conect', async (event, message) => {
    dbCon = await dbStatus()
    event.reply('db-message', "conectado")
  })

  app.on('before-quit', async () => {
    await desconectar()
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const template = [
  {
    label: 'Arquivo',
    submenu: [
      {
        label: 'Clientes',
        click: () => clientWindow(),
      },
      {
        label: 'Fornecedores',
        click: () => fornecWindow(),
      },
      {
        label: 'Produtos',
        click: () => produtoWindow(),
      },
      {
        label: 'Relatorio',
        click: () => relatorioWindow(),
      },

      {
        label: 'Sair',
        click: () => app.quit(),
        accelerator: 'Alt+F4'
      }
    ]
  },
  {
    label: 'Exibir',
    submenu: [
      {
        label: 'recarregar',
        role: 'reload',
      },
      {
        label: 'ferramentas do desenvolvedor',
        role: "toggleDevTools",
      },
      {
        type: 'separator'
      },
      {
        label: 'aplicar zoom',
        role: 'zoomIn',
      },
      {
        label: 'Reduzir',
        role: 'zoomOut',
      },
      {
        label: 'restaurar o zoom padrão',
        role: 'resetZoom',
      }
    ]
  },
  {
    label: 'ajuda',
    submenu: [
      {
        label: 'Sobre',
        click: () => aboutWindow(),
      }
    ]
  }
]

// CRUD Creat>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ipcMain.on('new-client', async (event, cliente) => {
  console.log(cliente)  // teste do passo 2 do slide
  try {
    const novoCliente = new ClientModel({
      nomeCliente: cliente.nomeCli,
      foneCliente: cliente.foneCli,
      emailCliente: cliente.emailCli
    })
    await novoCliente.save() //save() - moongoose
    dialog.showMessageBox({
      type: 'info',
      title: 'Aviso',
      message: "Cliente cadastrado com sucesso!",
      buttons: ['OK'],

    })


  } catch (error) {
    console.log(error)
  }

})






// passo 3 cadastrar no banco de dados 




// CRUD Read>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Aviso (buscar: Preenchimento  do campo obrigatorio)

ipcMain.on('dialog-infoSearchDialog', (event) => {
  dialog.showMessageBox({
    type: 'warning',
    title: 'atencao',
    message: 'preencha o campo cliente',
    buttons: [ok]

  })
  event.reply('focus-search')
})


// Recebimento do pedido de busca de um cliente pelo nome 
ipcMain.on('search-client', async (event, nomeCliente) => {
  console.log(nomeCliente)

  try {

    // find() "metodo de busca  new Regex "i" case insesitive"
    const dadosdocliente = await ClientModel.find({ nomeCliente: new RegExp(nomeCliente, 'i') }) // passo 2
    console.log(dadosdocliente) // teste do passo 2

    // ux  se o cliente nao estiver cadastrado avisar o usuario  e habilitar o cliente


    if (dadosdocliente.length === 0) {
      dialog.showMessageBox({
        type:'warning',
        title:'Aviso',
        message:'Cliente nao cadastrado\n deseja cadastrar este cliente',
        buttons: ['Sim','Nao'],
        defaultId: 0

      }).then((result)=>{
        if (result.response === 0) {
          // setar o nome do cliente no  form  e habilitar o cliente 
          event.reply('name-client')
        }else{
          event.reply('clear-search')

        }
      })
    }

    else{
       // passo 4 (enviar os dados do clientes ao renderizador)
        
      }

  } catch (error) {
    console.log(error)
  }

})
















// CRUD DELET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




ipcMain.on('open-about', () => {
  aboutWindow()
})

ipcMain.on('open-client', () => {
  clientWindow()
})

ipcMain.on('open-fornec', () => {
  fornecWindow()
})

ipcMain.on('open-produto', () => {
  produtoWindow()
})

ipcMain.on('open-relatorio', () => {
  relatorioWindow()
})



const statusConexao = async () => {
  try {
    await conectar()
    win.webContents.send('db-status', "banco de dados conectado")
  } catch (error) {
    win.webContents.send('db-status', `eroo de conexao ${error.message}`)
  }
}