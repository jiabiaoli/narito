import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import global from "@/common/global";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import installExtension, {VUEJS_DEVTOOLS} from "electron-devtools-installer";
app.dock.hide()
const isDevelopment = process.env.NODE_ENV !== 'production'
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    show();
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})

/**
 * 创建主窗体
 * @returns {Promise<void>}
 */
async function createWindow() {
    global.mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        }
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await global.mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) global.mainWindow.webContents.openDevTools()
    } else {
        createProtocol('app')
        await global.mainWindow.loadURL('app://./index.html')
    }
    global.mainWindow.show()
    global.mainWindow.on('close', (event) => {
        global.mainWindow.hide()
        event.returnValue = false
    })
}

app.whenReady().then(() => {
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

function show() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
}

export default {
    show() {
        show()
    }
}