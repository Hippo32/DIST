# 关于Promise、异步和事件循环 #
2018/7/30 and 2018/7/31 and 2018/8/1

目标：

- 理解Promise与异步编程
- 学习Deferred

promise可以使异步看起来如同步般清新易读，从而从回调地狱这种解脱出来。在未支持的浏览器中通过polyfill模拟实现。

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

为了正确追踪潜在的未被处理的拒绝，使用`rejectionHandled`与`unhandleRejection`事件就能保持包含这些Promise的一个列表，之后等待一段时间再检查此列表。
### 浏览器的拒绝处理 ###
浏览器同样能触发两个事件，来帮助识别为处理的拒绝。这两个事件会被`window`对象触发，并完全等效于Node.js的相关事件：

- `unhandledrejection`：当一个Promise被拒绝、而在事件循环的一个轮次中没有任何拒绝处理函数被调用，该事件就会被触发；
- `rejectionHandled`：若一个Promise被拒绝、并在事件循环的一个轮次之后再有拒绝处理函数被调用，该事件就会被触发。

浏览器事件的处理函数只会接收到包含下列属性的一个对象：

- `type`：事件的名称（`"unhandledrejection"`或`"rejectionhandled"`）；
- `promise`：被拒绝的Promise对象；
- `reason`：Promise中的拒绝值（拒绝原因）。

浏览器的实现中国存在的另一个差异就是：拒绝之（reason）在两种事件中都可用。
## 串联Promise ##
每次对`then()`或`catch()`的调用实际上创建并返回了另一个Promise，仅当前一个Promise被完成或拒绝时，后一个Promise才会被决议。
### 捕获错误 ###
Promise链允许你捕获前一个Promise的完成或拒绝处理函数中发生的错误。

为了确保能正确处理任意可能发生的错误，应当始终在Promise链尾部添加拒绝处理函数。
### 在Promise链中返回值 ###
Promise链能从一个Promise传递数据给下一个Promise。传递给执行器中的`resolve()`处理函数的参数，会被传递给对应Promise的完成处理函数。可以指定完成处理函数的返回值，以便沿着一个链继续传递数据。

拒绝处理函数同样能返回一个只用于完成下一个Promise。
### 在Promise链中返回Promise ###
从完成或拒绝处理函数中返回thenable，不会对Promise执行器何时被执行有所改变。第一个被定义的Promise将会首先运行它的执行器，接下来才轮到哦第二个Promise的执行器执行。返回thenable只是让你能在Promise结果之外定义附加响应。

若你想等待前面的Promise被解决，之后才去触发另一个Promise，可以通过在完成处理函数中创建一个新的Promise，来推迟完成处理函数的执行。
## 响应多个Promise ##
### Promise.all()方法 ###
接收单个可迭代对象（如数组）作为参数，并返回一个Promise。这个可迭代对象的元素都是Promise，只有在它们都完成后，所返回的Promise才会被完成。

若传递给`Promise.all()`的任意Promise被拒绝了，那么方法所返回的Promise就会立刻被拒绝，而不必等待其他的Promise结束

拒绝处理函数总会接收到单个值，而不是一个数组，该值就是被拒绝的Promise所返回的拒绝值。
### Promise.race()方法 ###
提供了监视多个Promise的一个稍微不同的方法。此方法也接受一个包含需监视的Promise的可迭代对象，并返回一个新的Promise，但一旦来源Promise中有一个被解决，所返回的Promise就会立刻被解决。
## 继承Promise ##
可将一个Promise用作派生类的基类。这允许你自定义变异的Promise，在内置Promise的基础上扩展功能。

例子：

    class MyPromise extends Promise {
        // 使用默认构造器
        success(resolve, reject) {
            return this.then(resolve, reject);
        }

        failure(reject) {
            return this.catch(reject);
        }
    }
    let promise = new MyPromise(function(resolve, reject) {
        resolve(42);
    });
    promise.success(function(value) {
        console.log(value);
    }).failure(function(value) {
        console.log(value);
    });

由于静态方法被继承了，`MyPromise.resolve()`方法、`MyPromise.reject()`方法、`MyPromise.race()`方法与`MyPromise.all()`方法在派生的Promise上都可用。后两个方法的行为等同于内置的方法，但前两个方法则有轻微的不同。

`MyPromise.resolve()`与`MyPromise.reject()`都会返回`MyPromise`的一个实例，无视传递进来的值的类型，这是由于这两个方法使用了`Symbol.species`属性来决定需要返回的Promise的类型。若传递内置Promise给这两个方法，将会被决议或被拒绝，并且会返回一个新的`MyPromise`，以便绑定完成或拒绝处理函数。

# event loop #
事件循环可以理解为实现异步的一种方式。

事件，用户交互，脚本，渲染，网络这些都是我们所熟悉的东西，他们都是由event loop协调的。触发一个click事件，进行一次ajax请求，背后都有event loop在运作。

JS是单线程，也就是说只有一个主线程，主线程有一个栈，每一个函数执行的时候，都会生成新的执行上下文，执行上下文会包含一些当前函数的参数、局部变量之类的信息，它会被推入栈中。

event loop的处理过程：

1. 在task队列中选择最老的一个task，用户代理可以选择任何task队列，如果没有可选的任务，则跳到下边的microtask步骤。
2. 将上边选择的task设置为正在运行的task
3. Run：运行被选择的task
4. 将event loop的currently runnig task变为null
5. 从task队列里移除前边运行的task
6. Microtasks：执行microtasks任务检查点。（也就是执行microtasks队列里的任务）
7. 更新渲染
8. 如果这是一个worker event loop，但是没有任务在task队列中，并且WorkerGlobalScope对象的closing标识为true，则销毁event loop，中止这些步骤，然后进行定义在web worker章节的run a worker
9. 返回到第一步。

event loop会不断循环上面的步骤，概括来说：

- event loop会不断循环的去取tasks队列的中最老的一个任务推入栈中执行，并在当次循环里依次执行并清空microtask队列里的任务。
- 执行完microtask队列里的任务，有可能会渲染更新。

microtasks检查点（microtask checkpoint）

当用户代理去执行一个microtask checkpoint，如果microtask checkpoint的flag（标识）为false，用户代理必须运行下面的步骤：

1. 将microtask checkpoint的flag设为true
2. Microtask queue handling：如果event loop的microtask队列为空，直接跳到第八步
3. 在microtask队列中选择最老的一个任务。
4. 将上一步选择的任务设为event loop的currently running task
5. 运行选择的任务
6. 将event loop的currently running task变为null
7. 将前面运行的microtask从microtask队列中删除，然后返回到第二部
8. Done：每一个environment settings object它们的responsible event loop 就是当前的event loop，会给environment settings object发一个rejected promises的通知。
9. 清理IndexedDB的事务
10. 将microtask checkpoint的flag设为false

event loop中的Update the rendering（更新渲染）

渲染的基本流程：

1. 处理HTML标记并构建DOM树
2. 处理CSS标记并构建CSSOM树，将DOM与CSSOM合并成一个渲染树
3. 根据渲染树来布局，以计算每个节点的几何信息
4. 将各个节点绘制到屏幕上

学习链接：

- [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)
- [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://juejin.im/post/5a6547d0f265da3e283a1df7)
- [JS异步机制](https://www.jianshu.com/p/667936441cb5)


# git操作 #
参考链接：[廖雪峰git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
## 修改后再提交 ##

	git add ./
	commit -m "xxx"
	git push -u origin master