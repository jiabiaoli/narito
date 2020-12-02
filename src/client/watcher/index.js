const {ipcRenderer} = require('electron')
export default {
    start() {
        ipcRenderer.send('watcher-start')
    },
    stop() {
        ipcRenderer.send('watcher-stop')
    },
    query(callback) {
        ipcRenderer.invoke('records').then(result => {
            callback && callback(result)
        })
    },
    query4Page(params, callback) {
        console.log(params)
        ipcRenderer.invoke('records-page', params).then(result => {
            callback && callback(result)
        })
    }
}