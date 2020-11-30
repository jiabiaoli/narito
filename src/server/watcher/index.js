import clipboardWatcher from '@/common/watcher/watcher'
import Record from '@/common/entity/Record'
import recordService from '@/common/service/RecordService'

const {ipcMain} = require('electron')

const watcher = clipboardWatcher({
    watchDelay: 1000,
    onImageChange: function (nativeImage) {
        let record = Record.createImage(nativeImage.toDataURL());
        recordService.insert(record);
    },
    onTextChange: function (text) {
        let record = Record.createText(text);
        recordService.insert(record);
    }
});

ipcMain.on('watcher-stop', (event, arg) => {
    watcher.stop()
})
ipcMain.on('watcher-start', (event, arg) => {
    watcher.start()
})


export default {
    start(callback) {
        watcher.start()
        callback && callback()
    },
    stop(callback) {
        watcher.stop()
        callback && callback()
    }
}