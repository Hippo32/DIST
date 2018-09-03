# dojo/Deferred #
2018/7/31 14:22:07 

这是一种轻松处理异步操作（如Ajax调用）的方法。用于管理异步线程之间的通信即callback回调，所有的dojo/request模块都用到了该模块。

dojo/Deferred是dojo中管理异步线程的基础，可以将它看成是dojo/promise/Promise的一个接口实现类。它返回的也不是Deferred对象，而是一个promise。

- 用`new Deferred()`实例化
- then()
	- 参数一：成功调用的函数
	- 参数二：Deferred被拒绝调用的函数

实例化一个dojo/Deferred时，会启动一个线程，当它调用.resolve()时会将结果传递给调用者。调用者使用返回的promised的.then()来设置收到结果后处理的回调函数。调用者还可以在外部调用.cancel()来取消启动的线程。

dojo/Deferred是dojo/promise/Promise的一个实现类，它重写了promise对象的接口方法，另外也自定义了几个来实现异步通信的方法：

1. `isResolved()`：判断deferred是否已经完成
2. `isRejected()`：判断deferred是否被拒绝
3. `isFulfilled()`：判断deferred是否已经完成或被拒绝
4. `isCanceled()`：判断deferred是否已经取消
5. `progress(update, strict)`：通过异步调用提供进度更新。可用于在异步操作完成之前进行沟通更新过程。  
	参数update为更新的进展对象，strict为可选的boolean，为true且promise已经为fulfilled状态时调用进度更新会抛出异常。
6. `resolve(value, strict)`：通过异步调用，当完成时将结果传递给回调函数执行，标识为成功状态。  
	参数value为deferred的结果哦，用于传递给callback回调函数，strict为可选的boolean，为true且promise已经为fulfilled状态时调用resolve会抛出异常。
7. `reject(error, strict)`：通过异步调用，拒绝deferred的执行，标识为错误状态。  
	参数error为deferred错误的结果，用于传递给errback回调函数，strict为可选的boolean，为true且promise已经为fulfilled状态时调用reject会抛出异常。
8. `then(callback, errback, proback)`：给deferred添加回调函数。  
	参数都是可选的function，依次表示deferred完成（resolved）、拒绝（rejected）、更新进度（progress）的回调函数。  
	返回值是一个表示回调函数结果的新的promise对象。可用于链接多个异步操作。
9. `cancel(reason, strict)`：通知取消异步操作。  
	参数reason表示取消操作的原因，strict为可选的boolean，为true且deferred已经为fulfilled状态时调用cancel会抛出异常。  
	返回值是取消的原因，deferred有canceler时，将原因进行加工后返回消息。

Deferred对象的一个重要功能是对我们的程序逻辑进行解耦。

## 链式调用 ##
每个then方法的返回值都仍然是一个Deferred对象。