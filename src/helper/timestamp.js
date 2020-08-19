export function leftpad(value, count=2, char='0') {
    let newValue = value.toString()
    if(value.toString().length < count){
        for(let i=0;i<count - value.toString().length;i++){
            newValue = char+value
        }
    }
    return newValue
}


export function getNewTimestamp(setDate){

    let now = new Date(setDate);
    let results =''
    results += leftpad(now.getDay())+'/'
    results += leftpad(now.getMonth())+'/'
    results += now.getFullYear()+' '
    results += leftpad(now.getHours())+':'
    results += leftpad(now.getMinutes())//+':'
    // results += leftpad(now.getSeconds())

    return results
}

export default {getNewTimestamp, leftpad}
