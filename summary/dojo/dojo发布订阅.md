# dojo发布/订阅 #
在很多情况下，通过建立连接也可以实现与使用发布/预订通信方式相同的功能，因此是否使用发布/预订通信往往取决于其实用性、方便性，以及要解决的具体问题。

在发布-订阅模式中，一些函数注册它们感兴趣的“主题”。然后，许多进程可以发布关于该主题的信息。当然，在JavaScript程序的上下文中，发布的“消息”只是参数几何，“发布”动作就是以给定的参数调用每一个订阅者。Dojo提供了下面三个函数来实现这一模式。

- `handle=dojo.subscribe(topic, context, handler)`：当通过dojo.publish发布topic（主题，其类型是字符串）时，由dojo.hitch(context, handler)给出的函数被调用。返回值handle可以用来取消订阅，只要调用dojo.unsubscribe即可。
- `dojo.unsubscribe(handle)`：删除先前由dojo.subscribe建立的连接。handle是dojo.subscribe返回的对象。
- `dojo.publish(topic, args)`：通过调用该主题的全部订阅者来发布topic（字符串），把args（数组）作为参数传给每一个订阅者。定义函数按照它们的订阅顺序被调用。

示例：

假设我们有一个每次只“发布”一个数值的主题“Numbers“。我们想要累计发布的数值，并在每次发布之后打印当前的累计结果。下面是利用发布-订阅给出的一个解法：

1. 定义一个累加器对象，它含有一个累计当前总和的方法，该方法订阅”Numbers“主题。
2. 定义一个打印累加器的当前总和的函数，该函数也订阅”Numbers“主题。

代码如下：

	// 一个累加数值的简单对象
	var numberAccumulator = {
		total: 0,
		add: function(x) {this.total += x; }
	};

	// numberAccumulator.add订阅”Numbers“主题
	dojo.subscribe("Numbers", numberAccumulator, "add");

	// 打印numberAccumulator.total
	function showTotal() {
		console.log("The total is: " + numberAcculator.total);
	}

	// showTotal订阅”Numbers“主题
	dojo.subscribe("Numbers", showTotal);

	// 测试
	// 注意：参数为数组！
	dojo.publish("Numbers", [1]);
	dojo.publish("Numbers", [2]);

程序在控制台中按顺序打印出如下信息：

"The total is 1"  
"The total is 3"

上述代码显示dojo.publish的第二个参数必须是一个数组，它把这个数组的内容作为一个个参数传给订阅函数。

发布/订阅`dojo/topic`

- 通过`dojo/topic`模块，Pub/Sub允许你为一个主题注册一个处理器（主题是一个事件的别名，此事件是多源的，以字符串形式描述）当发布的时候主题将被调用。
- 订阅/发布模式是靠主题和事件处理函数联系起来的。如果你想停止接受主题，topic.subscribe方法返回一个对象，该对象具有remove方法，可以用来删除相应的处理程序。
- `topic.subscribe`：用于订阅消息，接收两个参数，第一参数为要订阅的消息名字（唯一标识），如"socket/msg_arrive"，第二参数为回调函数。subscribe返回一个句柄，该句柄的remove方法用于取消订阅。
- `topic.publish`：用于发布消息，接收任意多个参数，第一参数为要发布的信息名字（唯一标识），如"socket/msg_arrive"，其他参数为传递给订阅回调函数的参数。

