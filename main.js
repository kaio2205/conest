const { ipcMain, Menu, shell } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const { conectar, desconectar } = require('./database.js')

let win
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/public/img/',
    webPreferences: {
      parent: win,       // obtem a relaçao parent
      modal: true, // foco na janela 
      preload: path.join(__dirname, 'preload.js')
    }
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  win.loadFile('./src/views/index.html')
}




const clientWindow = () => {
  // se a janela about não estiver aberta(bug 1)
  let clientes
  clientes = new BrowserWindow({
    width: 800, //largura
    height: 600,  //altura
    resizable: false, //evitar o redimensionamento
    autoHideMenuBar: true, //esconder menu
    parent: clientes,       // obtem a relaçao parent
    modal: true, // foco na janela
    icon: './src/public/img/' //ícone
  })


  clientes.loadFile('./src/views/clientes.html')




}


const produtoWindow = () => {
  let produto
  produto = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    autoHideMenuBar: true,
    parent: produto,       // obtem a relaçao parent
    modal: true, // foco na janela

  })


  produto.loadFile("./src/views/produtos.html")

}



const fornecWindow = () => {
  let fornec
  fornec = new BrowserWindow({
    width: 600,
    height: 800,
    resizable: false,
    autoHideMenuBar: true,
    parent: fornec,       // obtem a relaçao parent
    modal: true, // foco na janela
   
  })


  fornec.loadFile('./src/views/fornecedor.html')



}

const aboutWindow = () => {

  if (!about) {
    about = new BrowserWindow({
      width: 360,
      height: 300,
      resizable: false,
      autoHideMenuBar: true,
      parent: about,       // obtem a relaçao parent
      modal: true, // foco na janela
      icon: './src/public/img/about.png'
    })
  }

  about.loadFile('./src/views/sobre.html')



}


app.whenReady().then(() => {


  ipcMain.on('send-message', (event, message) => {
    console.log(`<<< ${message}`)
    statusConexao()
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
const statusConexao = async () => {
  try {
    await conectar()
    win.webContents.send('db-status', "banco de dados conectado")
  } catch (error) {
    win.webContents.send('db-status', `eroo de conexao ${error.message}`)
  }
}