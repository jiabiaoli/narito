const {app, Tray, Menu} = require('electron')
import watcher from "@/server/watcher";
import OptionService from "@/common/service/OptionService";


const path = require('path')
import '@/server/watcher/index'

let tray = null;
app.whenReady().then(() => {
    OptionService.get().then(option => {
        let menu = Menu.buildFromTemplate([
            {label: 'Item1', type: 'radio'},
            {label: 'Item2', type: 'radio'},
            {
                id: 'record-active',
                label: '记录中', type: 'checkbox', checked: true, click: (item, window, event) => {
                    if (item.checked === false) {
                        item.visible = false
                        let stopItem = menu.getMenuItemById('record-stop');
                        stopItem.visible = true
                        watcher.stop(() => {
                            stopItem.checked = true
                            OptionService.active()
                        })
                    }
                }
            },
            {
                id: 'record-stop',
                label: '已停止', type: 'checkbox', checked: true, click: (item, window, event) => {
                    if (item.checked === false) {
                        item.visible = false
                        let activeItem = menu.getMenuItemById('record-active');
                        activeItem.visible = true
                        watcher.start(() => {
                            activeItem.checked = true
                            OptionService.frozen()
                        })
                    }
                }
            },
            {label: 'Item4', type: 'radio'}
        ]);
        if (option.active) {
            let item = menu.getMenuItemById('record-stop');
            item.visible = false
            watcher.start()
        } else {
            let item = menu.getMenuItemById('record-active');
            item.visible = false
        }
        tray = new Tray(path.join(__dirname, 'assets/tray-active.png'))
        tray.setContextMenu(menu)
    })
})


