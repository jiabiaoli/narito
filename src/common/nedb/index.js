import Option from "@/common/entity/Option";

const Datastore = require('nedb')
const path = require('path')
const os = require('os')
const db = new Datastore({
    filename: path.join(os.homedir(), 'narito', 'narito.db'),
    autoload: true,
});
const optionStore = new Datastore({
    filename: path.join(os.homedir(), 'narito', 'option.db'),
    autoload: true,
});
export {
    db,
    optionStore
};