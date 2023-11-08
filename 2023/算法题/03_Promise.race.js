
// 设计并实现 Promise.race()

Promise._race = promises => {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(resolve, reject);
        });
    })
}