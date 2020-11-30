import clipboardWatcher from './watcher'
import Record from '../entity/Record'
import recordService from '../service/RecordService'

const {ipcMain} = require('electron')
import OptionService from "@/common/service/OptionService";

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
OptionService.get().then(option => {
    console.log("首选项:",option)
    if (option.active) {
        watcher.start()
    }
})

ipcMain.on('watcher-stop', (event, arg) => {
    console.log("接收到:停止消息")
    watcher.stop()
})
ipcMain.on('watcher-start', (event, arg) => {
    watcher.start()
})