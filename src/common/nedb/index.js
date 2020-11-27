const Datastore = require('nedb')
const path = require('path')
const os = require('os')
export const db = new Datastore({
    filename: path.join(os.homedir(), 'narito', 'narito.db'),
    autoload: true,
});
export const optionStore = new Datastore({
    filename: path.join(os.homedir(), 'narito', 'option.db')
});