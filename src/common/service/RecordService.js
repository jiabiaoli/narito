import {db} from '../nedb/index'

export default {
    insert: (record, callback) => {
        db.insert(record, (err, doc) => {
            callback && callback(err, doc)
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
    query4Page(params) {
        return new Promise((resolve,reject)=>{
            db.find({
                "type": "text",
                "content": {"$regex": new RegExp(params.text)}
            }).sort({createDate: -1}).skip((params.pageNum - 1) * params.pageSize).limit(params.pageSize).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
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