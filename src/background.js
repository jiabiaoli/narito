'use strict'
import path from 'path'
import '@/server/window/main'
import '@/server/tray/index'
import '@/server/notice'

global.__static = path.resolve(__dirname, "")
global.mainWindow = null
global.simpleWindow = null
global.optionWindow = null
global.records = [];