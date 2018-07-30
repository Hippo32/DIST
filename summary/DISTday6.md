# 数慧day6 #
2018/7/30 8:54:25 

目标：

- 理解Promise与异步编程
- 学习Deferred

在Dojo术语中，把可重用的代码块称为资源，把由资源组织而成的代码集合称为模块。

# Promise与异步编程 #
一个Promise指定一些稍后要执行的代码（就像事件与回调函数一样），并且也明确标示了作业的代码是否执行成功。
## 异步编程的背景 ##
都知道JS是单线程，即同一时刻只能执行一段代码。事件循环（event loop）是JS引擎的一个内部处理线程，能监视代码的执行并管理作业队列。
### 事件模型 ###
事件很有用，但它在面对更复杂的需求时仍然不够灵活。
### 回调模式 ###
回调函数模式类似于事件模型。不同之处在于需要调用的函数（即回调函数）是作为参数传入的。

回调函数模式要比事件模型灵活得多，因为使用回调函数串联多个调用会相对容易。

回调地狱，这会在嵌套过多回调函数时发生。嵌套多个方法调用会创建错综复杂的代码，会难以理解与调试。当想要实现更复杂的功能时，回调函数也会存在问题。
## Promise基础 ##
Promise是异步编程的一种解决方案。所谓Promise，简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上来说，Promise是一个对象，从它可以获取异步操作的消息。你能对结果进行操作的确切时刻，完全取决于Promise的生命周期是如何进行的。
### Promise的生命周期 ###
每个Promise都会经历一个短暂的生命周期。

- 初始为**挂起态(pending state)**：这表示异步操作尚未结束。一个挂起的Promise也被认为是**未决的(unsettled)**。
- 异步操作结束，Promise就会被认为是**已决的(settled)**，并进入两种可能状态之一：
	1. **已完成（fulfilled）**：Promise的一部操作已成功结束；
	2. **已拒绝（rejected）**：Promise的异步操作未成功结束，可能是一个错误，或由其他原因导致。

即存在三种状态：<font color="blue">挂起态（pending）和完成态（resolved）和失败态（rejected）</font>

内部的`[[PromiseState]]`属性会被设置为`"pending"`、`"fulfilled"`或`"rejected"`，以反映Promise的状态。无法以编程方式判断Promise到底处于哪种状态。不过可以使用`then()`方法在Promise的状态改变时执行一些特定操作。

<font color="red">`then()`</font>方法在所有的Promise上都存在，并且接受两个参数。

- 第一个参数是**Promise被完成时要调用的函数**，与异步操作关联的任何附加数据都会被传入这个完成函数，也就是<font color="red">`resolve`</font>
- 第二个参数则是**Promise被拒绝时要调用的函数**，与完成函数相似，拒绝函数会被传入与拒绝相关联的任何附加数据，也就是<font color="red">`reject`</font>
- `then()`方法会返回一个新的Promise实例

这两个参数都是可选的。

用这种方式实现`then()`方法的任何对象都被称为**thenable**。所有的Promise都是thenable，反之则未必成立。

Promise具有一个`catch()`方法，其行为等同于只传递拒绝处理函数给`then()`。

事件模式倾向于在出错时不被触发，而在回调函数模式中你必须始终记得检查错误参数。

即使完成或拒绝处理函数在 Promise 已经被解决之后才添加到作业队列，它们仍然会被执行。这允许你随时添加新的完成或拒绝处理函数，并保证它们会被调用。

每次调用`then()`或`catch()`都会创建一个新的作业，它会在Promise已决议时被执行。但这些作业最终会进入一个完全为Promise保留的作业队列。
### 创建未决的Promise ###
新的Promise使用`Promise`构造器来创建。此构造器接受单个参数：一个被称为执行器（executor）的函数，包含初始化Promise的代码。该执行器会被传递两个名为`resolve()`与`reject()`的函数作为参数。`resolve()`函数在执行器成功结束时被调用，用于示意该Promise已经准备好被决议（resolved），而`reject()`函数则表明执行器的操作已失败。

Promise的执行器会立即执行，早于源代码中在其之后的任何代码。调用`resolve()`触发了一个异步操作。传递给`then()`与`catch()`的函数会异步地被执行，并且它们也被添加到了作业队列（先进队列再执行）。完成处理函数（`then()`的第一个参数）与拒绝处理函数（`then()`的第二个参数）总是会在执行器的操作结束后被添加到作业队列的尾部。
### 创建已决的Promise ###
- 使用Promise.resolve()或使用Promise.reject()

	`Promise.resolve()`参数：将被`Promise`对象解析的参数。既可以是一个`Promise`对象，也可以是一个thenable。
	
	- 当参数时另一个<font color="red">`Promise`</font>实例时：
			
			var p1 = new Promise(function(resolve, reject) {
				// ...
			});
	
			var p2 = new Promise(function(resolve, reject) {
				// ...
				resolve(p1);
			});
		代码分析：p1和p2都是Promise的实例，p2中的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

		注意，这是p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。它们之间的关系是：
		
		- p1状态改变之后，p2立刻执行resolve()
		- p2等待p1的状态改变
	
	返回值：返回一个解析过带着给定值的`Promise`对象，如果返回值是一个promise对象，则直接返回这个Promise对象。
- 总结：对挂起态或完成态的Promise使用`Promise.resolve()`没问题，会返回原Promise；对拒绝太的Promise使用`Promise.reject()`也没问题。而除此之外的情况全都会在原Promise上包装出一个新的Promise。
- 非Promise的Thenable

	但传入了非Promise的thenable时，这些方法会创建一个新的Promise，此Promise会在the()函数之后被调用。

	当一个对象拥有一个能接受`resolve`与`reject`参数的`then()`方法，该对象就会被认为是一个非Promise的thenable

	当你不能确定一个对象是否是Promise时，将该对象传递给`Promise.resolve()`或`Promise.reject()`（取决于你的预期结果）是能找出的最好方式，因为传入真正的Promise只会被直接传递出来，并不会被修改。

### 执行器错误 ###
如果在执行器内部抛出了错误，那么Promise的拒绝处理函数就会被调用。

执行器处理程序捕捉了抛出的任何错误。但在执行器内抛出的错误仅当存在拒绝处理函数时才会被报告，否则这个错误就会被隐瞒。
## 全局的Promise拒绝处理 ##
### Node.js的拒绝处理 ###
- `unhandledRejection`：当一个Promise被拒绝、而在事件循环的一个轮次中没有任何拒绝处理函数被调用，该事件就会被触发；
	- 接收的参数参数是拒绝原因（常常是一个错误对象）以及已被拒绝的Promise。
- `rejectionHandled`：若一个Promise被拒绝、并在事件循环的一个轮次之后再有拒绝处理函数被调用，该事件就会被触发。
	- 只有一个参数，即已被拒绝的Promise
### 浏览器的拒绝处理 ###
## 串联Promise ##
## 响应多个Promise ##
## 继承Promise ##
## 异步任务运行 ##
## 总结 ##





# git操作 #
参考链接：[廖雪峰git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
## 修改后再提交 ##

	git add ./
	commit -m "xxx"
	git push -u origin master