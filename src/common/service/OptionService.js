import {optionStore} from '../nedb/index'
import Option from "@/common/entity/Option";

export default {
    async get() {
        return await new Promise((resolve) => {
            optionStore.findOne({}, (err, doc) => {
                if (doc) {
                    resolve(doc)
                } else {
                    let option = Option.create();
                    optionStore.insert(option, (err, doc) => {
                        resolve(doc)
                    })
                }
            });
        })
    },
    active() {
        optionStore.findOne({}, (err, doc) => {
            optionStore.update({_id: doc._id}, {$set: {active: true}})
        })
    }
    ,
    frozen() {
        optionStore.findOne({}, (err, doc) => {
            optionStore.update({_id: doc._id}, {$set: {active: false}})
        })
    }
}