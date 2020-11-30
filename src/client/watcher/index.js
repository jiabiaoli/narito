const  {ipcRenderer} =require('electron')


export default {
    start(){
        ipcRenderer.send('watcher-start')
    },
    stop(){
        ipcRenderer.send('watcher-stop')
    }
}