// <!-- 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况 -->

function deepCopy(target, cache = new Set()) { 
    if (typeof target !== 'object' || cache.has(target)) { 
        return target;
    }
    if (Array.isArray(target)) { 
        target.map(t => { 
            cache.add(t);
            return t;
        });
    } else { 
        return [
            ...Object.keys(target), 
            ...Object.getOwnPropertySymbols(target)
        ].reduce((res, key) => {
            cache.add(target[key]);
            res[key] = deepCopy(target[key], cache);
            return res;
        }, 
        target.constructor !== Object ? Object.create(target.constructor.prototype) : {})
    } 
}
