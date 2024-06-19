const { ipcRenderer, ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')
const { conectar, desconectar } = require('./database.js')

// janela principal (definir o objeto win como variavel publica)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/packge.png',
        webPreferences: {
        preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

let about // bug de abertura
 
const aboutWindow = () => {      
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 360,
            height: 220,
            icon: './src/public/img/packge.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/sobre.html')
    // bug2
    about.on('closed', () => {
        about = null
    })
}


let cliente // bug de abertura
 
const clientes = () => {      
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 360,
            height: 220,
            icon: './src/public/img/packge.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/sobre.html')
    // bug2
    about.on('closed', () => {
        about = null
    })
}


let fornecedores // bug de abertura
 
const fornecedor = () => {      
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 360,
            height: 220,
            icon: './src/public/img/packge.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/sobre.html')
    // bug2
    about.on('closed', () => {
        about = null
    })
}

let produto // bug de abertura
 
const produtos = () => {      
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 360,
            height: 220,
            icon: './src/public/img/packge.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/sobre.html')
    // bug2
    about.on('closed', () => {
        about = null
    })
}






// iniciar a aplicaçao 
app.whenReady().then(() => {
    //   status de conexao  com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<<${message}`)
        statusConexao()
    })

    // desconectar do banco ao encerrar a janela 
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


//  Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            },
            {
               

            }



        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            }, {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            }, {
                type: 'separator'

            }, {
                label: 'aplicar zoom',
                role: 'zoomIn'
            }, {
                label: 'Reduzir',
                role: 'zoomOut'
            }, {
                label: 'Restaurar o zoom padrao',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'docs',
                click: () => shell.openExternal('https://www.electronjs.org/docs/latest/')
            },
            {
                type: 'separator'
            },

            {
                label: 'Sobre',
                accelerator: 'Alt+F1',
                click: () => aboutWindow()
            },
        ]
    }

]



// /-------------------------------------------------------------------
// funcçao que verifica o status da conexao 
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "banco de dados conectados.")
    } catch (error) {
        win.webContents.send('db-status', `erro de conexao${message}`)

    }
}

// Exemplo 3 recebimento de uma açao a ser executada 

ipcMain.on("open-about", () => {
    aboutWindow()
})