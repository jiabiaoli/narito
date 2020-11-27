import clipboardWatcher from './watcher'
import Record from '../entity/Record'
import {db} from '../nedb/index'

export const watcher = clipboardWatcher({
    watchDelay: 1000,
    onImageChange: function (nativeImage) {
        let record = Record.createImage(nativeImage.toDataURL());
        db.insert(record, (err, doc) => {
            console.log("插入图片")
        });
    },
    onTextChange: function (text) {
        let record = Record.createText(text);
        db.insert(record, (err, doc) => {
            console.log("插入文字")
        });
    }
});