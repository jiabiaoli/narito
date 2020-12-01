const {app, Tray, Menu,nativeImage} = require('electron')
import watcher from "@/server/watcher";
import OptionService from "@/common/service/OptionService";
import main from '@/server/Window/main'
const path = require('path')
const fs = require('fs')
import '@/server/watcher/index'

let tray_active =nativeImage.createFromPath(path.join(__static, 'static/tray-active.png'))
let tray_frozen = nativeImage.createFromPath(path.join(__static, 'static/tray-frozen.png'))
let tray = null
app.whenReady().then(() => {
    function active(item, menu) {
        if (item.checked === false) {
            item.visible = false
            let activeItem = menu.getMenuItemById('record-active');
            activeItem.visible = true
            watcher.start(() => {
                activeItem.checked = true
                OptionService.frozen()
            })
            tray.setImage(tray_active)
        }
    }

    function frozen(item, menu) {
        if (item.checked === false) {
            item.visible = false
            let stopItem = menu.getMenuItemById('record-stop');
            stopItem.visible = true
            watcher.stop(() => {
                stopItem.checked = true
                OptionService.active()
            })
            tray.setImage(tray_frozen)
        }
    }

    OptionService.get().then(option => {
        let menu = Menu.buildFromTemplate([
            {
                label: '主窗口', click: () => {
                    main.show()
                }
            },
            {
                id: 'record-active',
                label: '记录中', type: 'checkbox', checked: true, click: (item, window, event) => {
                    frozen(item, menu)
                }
            },
            {
                id: 'record-stop',
                label: '已停止', type: 'checkbox', checked: true, click: (item, window, event) => {
                    active(item, menu);
                }
            },
            {
                label: '退出', click: () => {
                    app.quit()
                }
            }
        ]);
        if (option.active) {
            let item = menu.getMenuItemById('record-stop');
            item.visible = false
            watcher.start()
            tray = new Tray(tray_active)
        } else {
            let item = menu.getMenuItemById('record-active');
            item.visible = false
            tray = new Tray(tray_frozen)
        }
        tray.setContextMenu(menu)
    })
})




