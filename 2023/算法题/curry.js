
/**
 * 计算和
 * @param  {...any} arg 参数
 * @returns 
 */
const _add = (...arg) => {
    console.log('---------->arg: ', arg);
    return arg.reduce((t, v, i) => {
        return t + v;
    }, 0)
}

function _curry(fn, length) { 
    length = length || fn.length; // 获取函数 fn 参数的长度
      
     return function (...args) {
        return args.length >= length // 接收的参数长度 判断
        ?  fn.apply(this, args) // 满足要求，执行 fn 函数，传入新函数的参数 
        : _curry(fn.bind(this, ...args), length - args.length) // 不满足要求，递归 currying 函数，新的 fn 为 bind 返回的新函数（bind 绑定了 ...args 参数，未执行），新的 length 为 fn 剩余参数的长度
     }
}

// const add = _curry(_add, 3);

// const v = add(1); // 1
// const v = add(1)(2); // 3
// const v = add(1)(2)(3); // 6
// const v = add(1)(2, 3); // 6
// const v = add(1, 2)(3); // 6
// const v = add(1, 2, 3); // 6

// const v = _add.bind(this, 1).bind(this, 2, 3).bind(this, 4).apply(this, [5, 6]);

// console.log('---------->4', v);


// 拓展

// const add = (...arg) => {
//     const fn = add.bind(null, ...arg);
//     fn.res = function () {
//         return arg.reduce((t, v, i) => {
//             return t + v;
//         }, 0);
//     }

//     return fn;
// }

// // const v = add(1)(2)(3).res();
// const v = add(1)(2)(3)(4,5,6).res();

// console.log('---------->4', v);
