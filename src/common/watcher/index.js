import clipboardWatcher from './watcher'
import Record from '../entity/Record'
import recordService from '../service/RecordService'

export const watcher = clipboardWatcher({
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