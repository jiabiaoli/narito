import {db} from '../nedb/index'

export default {
    insert: (record) => {
        db.insert(record, (err, doc) => {
            console.log("插入成功,_id:", doc._id)
        })
    },
    star: (_id) => {
        db.update({_id}, {$set: {star: true}}, {}, (err, count) => {
            console.log("收藏,数量:", count)
        })
    },
    unStar: (_id) => {
        db.update({_id}, {$set: {star: false}}, {}, (err, count) => {
            console.log("取消收藏,数量:", count)
        })
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.find().sort({createDate: -1}).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }

            })
        })
    }
}