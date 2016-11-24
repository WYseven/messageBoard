/**
 * Created by seven on 2016/11/24.
 */

"use strict"

class M{
    constructor(collection){
        this.collection = collection;
        this.db = db.collection(collection);
    }

    find(options){
        return this.db.find(options)
    }

}


function m(collection){
    return new M(collection);
}


module.exports.M = m;

