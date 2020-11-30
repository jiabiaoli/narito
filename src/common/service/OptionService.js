import {optionStore} from '../nedb/index'
import Option from "@/common/entity/Option";

export  default {
    get(){
        return new Promise((resolve)=>{
            optionStore.findOne({},(err,doc)=>{
                if(doc){
                    resolve(doc)
                }
                let option = Option.create();
                optionStore.insert(option,(err,doc)=>{
                    resolve(doc)
                })
            })
        })
    }
}