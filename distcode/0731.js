let rejected;

window.onunhandledrejection = function(event) {
    console.log(event.type);
    console.log(event.reason.message);
    console.log(rejected === event.promise);
};

window.onrejectionhandled = function(event) {
    console.log(event.type);
    console.log(event.reason.message);
    console.log(rejected === event.promise);
};
rejected = Promise.reject(new Error("Explosion!"));

/* let possiblyUnhandleRejections = new Map();

// 当一个拒绝未被处理，将其添加到map
process.on("unhandleRejection", function(reason, promise) {
    possiblyUnhandleRejections.set(promise, reason);
});

process.on("rejectionHandled", function (promise) { 
    possiblyUnhandleRejections.delete(promise);
 });

 setInterval(function() {
     possiblyUnhandleRejections.forEach(function(reason, promise) {
         console.log(reason.message ? reason.message : reason);
         // 做点事来处理拒绝
         handleReection(promise,reason);
     });
     possiblyUnhandleRejections.clear();
 }, 60000); */