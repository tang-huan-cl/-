
// # 统计字符串中出现次数最多的字符

let str = 'asdfghjklaqwertyuiopiaia'; 
const strChar = str => { 
    let string = [...str], maxValue = '', obj = {}, max = 0; 
    string.forEach(value => { 
        obj[value] = obj[value] == undefined ? 1 : obj[value] + 1;
        if (obj[value] > max) {
            max = obj[value]; maxValue = value; 
        } 
    })
    return maxValue; 
}