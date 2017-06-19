var module = require('../module')
var path = require('path')
var pages = []

function isArray(val){
    return Object.prototype.toString.call(val) === '[object Array]'
}
function handle(){
    var loop = function(keys, obj){
        if(obj.hasOwnProperty('chunks')&&isArray(obj['chunks'])){
            var chunks = obj['chunks']
            var hasEntry = !!obj.entry
            var keysClone = []
            var page = {
                title: obj.title,
                url: keys.join('/') + '.html',
                template: obj.template,
                chunks: []
            }

            if(hasEntry){
                page.entry = path.resolve('src/entries', keys.slice(0,keys.length-1).concat([obj.entry]).join('/')+'.js')

                keysClone = keys.concat([]).splice(0, keys.length-1).concat([obj.entry])

                // entry name
                for(var i = 1, len = keysClone.length;i<len;i++){
                    var key = keysClone[i]
                    keysClone[i] = key.slice(0,1).toUpperCase() + key.slice(1)
                }
                page.entryName = keysClone.join('')

                page.chunks = obj.chunks.concat([page.entryName])
            }
            pages.push(page)
            return
        }
        Object.keys(obj).forEach(function(key){
            loop(keys.concat(key), obj[key])
        })
    }
    loop([], module)
}
exports.getEntries = function(){
    var ret = {}
    handle()
    pages.forEach(function(page){
        if(page.entryName){
            ret[page.entryName] = page.entry
        }
    })
    return ret
}

exports.getEntryNames = function(){
    var ret = []
    pages.forEach(function(page){
        if(page.entryName){
            ret.push(page.entryName)
        }
    })
    return ret
}

exports.getPages = function(){
    return pages
}