const {ipcRenderer} = require('electron')

export default {
    show(params) {
        ipcRenderer.send('notice', params)
    }
}