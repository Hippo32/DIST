
// node.js拒绝处理rejectionHandled
let rejected;

process.on("rejectionHandled", function(promise) {
    console.log(rejected === promise);
});
rejected = Promise.reject(new Error("Explosion!"));
//延迟添加拒绝处理函数
setTimeout(function() {
    rejected.catch(function(value) {
        console.log(value.message);
    });
}, 1000);

// node.js拒绝处理unhandleRejection
/* let rejected;
process.on("unhandledRejection", function(reason, promise) {
    console.log(reason.message);
    console.log(rejected === promise);
});
rejected = Promise.reject(new Error("Explosion!")); */

// 执行器错误
/* let promise = new Promise(function(resolve, reject) {
    throw new Error("Explosion!");
});

promise.catch(function(error) {
    console.log(error.message);
}); */

// 非Promise的thenable reject
/* let thenable = {
    then: function(resolve, reject) {
        reject(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.catch(function(value) {
    console.log(value); // 42
}); */

// 非Promise的thenable resolve
/* let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value); // 42
}); */

/* var fs = require('fs');
console.time('Promise example start')
var p1 = new Promise( (resolve, reject) => {
    setTimeout(() => resolve('h1'), 3000);
});

var p2 = new Promise( (resolve, reject) => {
    setTimeout(() => resolve(p1), 10);
});

p2.then( ret => {
    console.log(ret);
    console.timeEnd('Promise example end')
}); */

// Promise.resolve()
/* let promise = Promise.resolve(42);
promise.then(function(value) {
    console.log(value);
}); */

// 构造函数和resolve的执行顺序
/* let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
});

promise.then(function() {
    console.log("Resolved");
});

console.log("Hi!"); */

/*
 * 输出：
 * Promise
 * Hi!
 * Resolved
 */

/* fs.readFile("./distcode/helloworld.txt", 'utf-8', function(err, contents) {
    if(err) {
        throw err;
    }
    console.log(contents);
});
console.log("Hi!"); */

// 在Node.js中使用了一个Promise，实现readFile()函数
/* function readFile(filename) {
    return new Promise(function(resolve, reject) {
        // 触发异步操作
        fs.readFile(filename, { encoding: "utf8" }, function(err, contents) {
            // 检查错误
            if (err) {
                reject(err);
                return;
            }

            // 读取成功
            resolve(contents);
        });
    });
}

let promise = readFile("./distcode/helloworld.txt");

// 同时监听完成与拒绝
promise.then(function(contents) {
    // 完成
    console.log(contents);
}, function(err) {
    // 拒绝
    console.log(err.message);
}); */

/*
 * 执行器会在readFile()被调用时立即运行。
 * 当resolve()或reject()在执行器内部被调用时，一个作业被添加到作业队列中，以便决议（resolve）这个Promise
 * 这被称为作业调度
 * 在作业调度中，你添加新作业到队列中是表示：“不要立刻执行这个作业，但要在稍后执行它”。
 */