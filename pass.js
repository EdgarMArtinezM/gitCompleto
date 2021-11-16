const fs=require("fs")
const moment=require("moment")
let year=moment().format("YY")
let yearInt=parseInt(year)

module.exports=function makeId(){
//function makeId() {
    try{
        let data=fs.readFileSync("nuevo.json","utf-8")
        let info = JSON.parse(data)
        if (info != 0) {
            let ultimo = info[info.length - 1]
            let len = ultimo.id.substr(3,info.length)
            let ult = parseInt(len) + 1
            return `${year}-${ult}`
        }else{
            return `${year}-${0}`
        }
    }catch (e) {
        return `${year}-${0}`
    }

}

//console.log(makeId())



