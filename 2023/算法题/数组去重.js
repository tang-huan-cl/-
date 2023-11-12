// forEach

// let arr = ["1", "2", "3", "1", "a", "b", "b"];
// const unique = (arr) => {
//   let obj = {};
//   arr.forEach((value) => {
//     obj[value] = 0;
//   });
//   return Object.keys(obj);
// };

// filter 
// let arr = ['1', '2', '3', '1', 'a', 'b', 'b'];

// const unique = arr => { 
//     return arr.filter((ele, index, array) => { 
//         return index === array.indexOf(ele);
//     }) 
// }


// set 
let arr = ['1', '2', '3', '1', 'a', 'b', 'b']; 

const unique = arr => { return [...new Set(arr)] }