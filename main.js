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



const clientWindow= () => {
  // se a janela about não estiver aberta(bug 1)
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    client = new BrowserWindow({
      width: 800, //largura
      height: 600,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      parent: father,
      modal: true
      
    })
  }

  client.loadFile('./src/views/clientes.html')
 }


const produtoWindow= () => {
  
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    produto = new BrowserWindow({
      width: 800, //largura
      height: 600,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      parent: father,
      modal: true
      
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
      modal: true
      
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
        parent: father,
        modal: true
        
      })
    }
  
    relatorio.loadFile('./src/views/relatorio.html')
    
    }







const aboutWindow = () => {
  
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    about = new BrowserWindow({
      width:  400, //largura
      height: 290,  //altura
      resizable: false, //evitar o redimensionamento
      autoHideMenuBar: true, //esconder menu
      parent: father,
      modal: true
      
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
        label: 'Relatorio',
        click: ()=> relatorioWindow(),
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

ipcMain.on('open-relatorio', () => {
  relatorioWindow()
})



const statusConexao = async () => {
  try {
    await conectar()
    win.webContents.send('db-status',"banco de dados conectado")
  } catch (error) {
    win.webContents.send('db-status', `eroo de conexao ${error.message}`)
  }
}