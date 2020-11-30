'use strict'

const electron = require('electron')
const clipboard = electron.clipboard
module.exports = function (opts) {
    console.log('start.....')
    opts = opts || {}
    const watchDelay = opts.watchDelay || 1000

    let lastText = clipboard.readText()
    let lastImage = clipboard.readImage()

    let intervalId = null

    return {
        start: () => {
            console.log("启动定时器")
            intervalId = setInterval(() => {
                const text = clipboard.readText()
                const image = clipboard.readImage()
                if (opts.onImageChange && imageHasDiff(image, lastImage)) {
                    lastImage = image
                    opts.onImageChange(image)
                }
                if (opts.onTextChange && textHasDiff(text, lastText)) {
                    lastText = text
                    opts.onTextChange(text)
                }
            }, watchDelay)
        },
        stop: () => {
            console.log("停止定时器")
            clearInterval(intervalId)
        }
    }
}


function imageHasDiff(a, b) {
    return !a.isEmpty() && b.toDataURL() != a.toDataURL()
}


function textHasDiff(a, b) {
    return a && a != b;
}
