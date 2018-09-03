# dojo/promise #
2018/8/1 9:13:56 

dojo/promise具有以下特征

- 可以处于以下三种状态中的一种:未实现(unfulfilled)、解决(resolved)、拒绝(rejected)
- 只会从未实现状态转换到解决状态或转换到拒绝状态
- 实现一个`then`方法，用于注册状态更改通知的回调
- 回调不能改变promise产生的值
- 一个promise的`then`方法返回一个新的promise，来形成链让原始的promise值不变

dojo/Deferred模块是dojo promise API的主要实现

# dojo/when #
dojo/when函数最多有四个参数:a promise or value、an optional callback、an optional error handler and an optional progress handler。它有两条路:

- 第一个参数不是一个promise，而回调是提供的，回调将立即被调用，以提供的值作为第一个参数，回调的结果将被返回。如果没有提供回调，第一个参数将立即返回。
- 如果第一个参数是一个promise，回调、错误处理程序和进度处理程序将传递给该承诺的then方法，并返回promise的结果，设置回调以在promise准备好时执行。