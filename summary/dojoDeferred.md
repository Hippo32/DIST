# dojo/Deferred #
2018/7/31 14:22:07 

这是一种轻松处理异步操作（如Ajax调用）的方法。

- 用`new Deferred()`实例化
- then()
	- 参数一：成功调用的函数
	- 参数二：Deferred被拒绝调用的函数

Deferred对象的一个重要功能是对我们的程序逻辑进行解耦。

## 链式调用 ##
每个then方法的返回值都仍然是一个Deferred对象。