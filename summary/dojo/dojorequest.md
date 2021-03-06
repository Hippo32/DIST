# dojo/request #
2018/7/27 and 2018/7/31 and 2018/8/9

用于从客户端向服务器发出请求。

dojo/requestAPI

	require(["dojo/request"], function(request) {
		var promise = request(url, options);
		promise.then(
			function(data) {},
			function(error) {}
		);
		promise.response.then(
			function(response) {},
			function(error) {}
		);
		request.get(url, options).then(...);
		request.post(url, options).then(...);
		request.put(url, options).then(...);
		request.del(url, options).then(...);
	});

`dojo/request`允许您在不重新加载页面的情况下向服务器发送数据和从服务器接收数据promises和Deferreds允许更容易地编程非阻塞异步代码。

- 第一个参数是要请求的URL
- 指定第二个参数来使用对象自定义请求。

常见的配置参数：

- **method**：表示用于发出请求的HTTP方法的大写字符串，默认是GET
- **sync**：一个布尔值，如果为真，会导致请求被阻塞，直到服务器阻塞响应或请求超时
- **query**：形如key=value的字符串，或者形如{key:'value'}的对象，包含要追加的查询参数的字符串或键值对象的URL
- **data**：包含数据的字符串、键值对象或FormData对象传递到服务器。表示需要发送的数据（GET和DELET请求会忽略这个参数）
- **timeout**：在考虑请求失败和触发之前的毫秒数。错误处理程序。
- **handleAs**：表示如何转换响应的文本有效负载的字符串将转换后的数据传递给成功处理程序。默认"text"，其他可能的值包括"json"，"javascript"，以及"xml"。
- **headers**：包含要随请求发送的附加头的键值对象。形如{'Header-Name': 'value'}的对象。

所有dojo/request方法都返回一个“promise”对象，这个promise对象最终会提供响应数据。如果在发起请求时指定了某个响应内容解析器（通过handleAs参数），那么这个promise对象就会提供这个内容解析器的解析结果，否则它将直接返回响应的body部分的文本。

### JSONP ###
AJAX请求仅限于当前域。如果需要从其他域请求数据，则可以使用JSONP。使用JSONP时，会在当前页面中插入脚本标记，请求src文件，服务器将数据包装在回调函数中，并且在解释响应时，将调回回调，并将数据作为其第一个参数。JSONP请求是使用`dojo/request/script`生成的。

	require([
		"dojo/dom",
		"dojo/on",
		"dojo/request/script",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/domReady!"
	], function(dom, on, scipt, domConstruct, arrayUtil) {
		var pullsNode = dom.byId("pullrequests");
		on(dom.byId("pullrequestsButton"), "click", function(evt) {
			script.get("https://api.github.com/repos/dojo/dojo/pulls", {
				jsonp: "callback"
			}).then(function(response) {
				domConstruct.empty(pullsNode);
				var fragment = document.createDocumnetFragment();
				arrayUtil.forEach(response.data, function(pull) {
					var li = domConstruct.create("li", {}, fragment);
					var link = domConstruct.create("a", {href: pull.url, innerHTML: pull.title}, li);
				});
				domConstruct.place(fragment, pullsNode);
			});
		});
	});

### dojo/request/notify ###
dojo/request/notify提供了一种机制，可以报告dojo/request(或dojo/request中的任何提供者)发出的请求的状态。要求dojo/request/notify将允许提供程序发出可以被监听并用于报告请求状态的事件。要侦听事件，请使用两个参数调用dojo/request/notify模块的返回值:事件名称和侦听器函数。以下是dojo/request提供者发出的事件:

- start
- send：在提供者发送请求之前发出的
- load：当提供者收到成功的响应时发出
- error：当提供者收到错误时发出。
- done：当提供者完成请求时发出，而不管请求是否成功
- stop：当所有请求完成后发出。

`start`和`stop`没有接受任何参数。`send`接收两个参数：表示请求的对象和取消函数。调用取消功能将在开始之前取消请求。`load`、`error`和`done`接收一个参数：代表来自服务器的响应中的对象。

### dojo/request/registry ###
dojo/request/registry提供了一种机制：根据不同的请求URL，提供不同的处理方式（provider）。注册中心的常见用途是根据请求是使用JSON发送到当前域，还是使用JSONP发送到另一个域来分配提供者。如果url根据正在进行的操作而变化，您也可以使用这种方法。

dojo/request/registry参数

- url：url可以是字符串，regExp或函数
	- string：如果url是字符串，如果url是完全匹配，则将使用提供程序
	- regExp：如果url是正则表达式，则在正则表达式与请求的URL匹配时将使用提供程序
	- function：这个函数和函数的请求参数（url和option对象）会被传递，如果反悔true，就会使用provider
- provider：用于处理请求
- first：一个可选的布尔参数。如果为true，在其他provider注册前注册这个provider

一些小知识点：

- GET用于简单的数据请求而无需考虑安全性。GET通常比POST快。POST通常用于发送表单数据，以及何时不应在URL上传递数据。

参考链接：

- [dojo基础：dojo/request（翻译）](https://blog.csdn.net/feifei2211/article/details/52789429)