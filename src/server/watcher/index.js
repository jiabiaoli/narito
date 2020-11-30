import clipboardWatcher from '@/common/watcher/watcher'
import Record from '@/common/entity/Record'
import recordService from '@/common/service/RecordService'

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
    watcher.stop()
})
ipcMain.on('watcher-start', (event, arg) => {
    watcher.start()
})


export default {
    start(){
        watcher.start()
    },
    stop(){
        watcher.stop()
    }
}