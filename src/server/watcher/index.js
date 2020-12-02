import clipboardWatcher from '@/common/watcher/watcher'
import Record from '@/common/entity/Record'
import recordService from '@/common/service/RecordService'

const {ipcMain} = require('electron')

const watcher = clipboardWatcher({
    watchDelay: 1000,
    onImageChange: function (nativeImage) {
        let record = Record.createImage(nativeImage.toDataURL(),nativeImage.size());
        recordService.insert(record, (err, doc) => {
            global.records.push(doc)
            global.mainWindow.webContents.send('on-record-change',doc)
        });
    },
    onTextChange: function (text) {
        let record = Record.createText(text);
        recordService.insert(record, (err, doc) => {
            global.records.push(doc)
            global.mainWindow.webContents.send('on-record-change',doc)
        });
    }
});
recordService.getAll().then(docs => {
    global.records.push(...docs)
})

ipcMain.handle('records', async (event, args) => {
    return global.records
})

ipcMain.handle('records-page', async (event, args) => {
    console.log(args)
    let result = await recordService.query4Page(args);
    return result
})
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