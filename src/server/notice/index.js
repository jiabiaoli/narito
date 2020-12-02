const {Notification, ipcMain} = require('electron')

ipcMain.on('notice', (event, args) => {
    show(args);
})

function show(params) {
    if (!Notification.isSupported()) {
        return
    }
    let notice = new Notification(params);
    notice.show();
}

export default {
    show(params) {
        show(params)
    }
}