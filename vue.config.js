const path = require("path")
module.exports = {
    pluginOptions: {
        electronBuilder: {
            "nodeIntegration": true,
            builderOptions: {
                "productName": "narito",
                "appId": "com.youzhi",
                "copyright": "Copyright © 2020",
                "compression": "store",
                "directories": {
                    "output": "dist_electron"
                },
                "asar": false,
                "dmg": {
                    "contents": [
                        {
                            "x": 410,
                            "y": 150,
                            "type": "link",
                            "path": "/Applications"
                        },
                        {
                            "x": 130,
                            "y": 150,
                            "type": "file"
                        }
                    ]
                },
                "mac": {
                    "icon": "public/icon/icon.icns"
                },
                "win": {
                    "icon": "public/icon/icon.ico",
                    "target": [
                        {
                            "target": "nsis",
                            "arch": ["ia32", "x64"]
                        }
                    ]
                },
                "nsis": {
                    "oneClick": false,
                    "perMachine": true,
                    "allowElevation": true,
                    "allowToChangeInstallationDirectory": true,
                    "createDesktopShortcut": true,
                    "createStartMenuShortcut": true,
                    "installerIcon": "public/icons/icon.ico",
                    "uninstallerIcon": "public/icons/uninstall.ico",
                    "installerHeaderIcon": "public/icons/icon.ico",
                    "shortcutName": "narito"
                }
            }
        }
    }
}