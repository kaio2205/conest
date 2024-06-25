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
      preload: path.join(__dirname, 'preload.js')
    }
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  win.loadFile('./src/views/index.html')
}

let about 


let clientes
const clientWindow= () => {
  // se a janela about não estiver aberta(bug 1)
  if (!clientes) {
    client = new BrowserWindow({
      width: 360, //largura
      height: 220,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      icon: './src/public/img/' //ícone
    })
  }

  client.loadFile('./src/views/cliente.html')
 
 
  client.on('closed', () => {
    client = null
  })

}

let produtos
const produtoWindow= () => {
  
  if (!produtos) {
    produto = new BrowserWindow({
      width: 360, 
      height: 220, 
      resizable: false, 
      autoHideMenuBar: true, 
      icon: './src/public/img/' 
    })
  }

  produto.loadFile("./src/views/produtos.html")

  produtos.on('closed', () => {
    produtos = null
  })

}

const fornecWindow = () => {

  if (!fornecedor) {
    fornec = new BrowserWindow({
      width: 360, 
      height: 220,  
      resizable: false, 
      autoHideMenuBar: true, 
      icon: './src/public/img/' 
    })
  }

  fornecedor.loadFile('./src/views/fornecedor.html')
  
  forneceedor.on('closed', () => {
    fornec = null
  })

}

const aboutWindow = () => {
  
  if (!about) {
    about = new BrowserWindow({
      width: 360, 
      height: 300,  
      resizable: false, 
      autoHideMenuBar: true, 
      icon: './src/public/img/about.png' 
    })
  }

  about.loadFile('./src/views/sobre.html')
  
  about.on('closed', () => {
    about = null
  })

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
    win.webContents.send('db-status',"banco de dados conectado")
  } catch (error) {
    win.webContents.send('db-status', `eroo de conexao ${error.message}`)
  }
}