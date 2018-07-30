# 数慧day5 #
2018/7/27 9:16:51 

## dojo/Deferred ##
这是一种轻松处理异步操作（如Ajax调用）的方法。

实例化一个Deferred后，可以通过将函数传递给`then`方法来注册，该方法将在`Deferred`解析时调用（成功）。第一个参数是个回调函数。该`then`方法还采用第二个参数：如果`Deferred`被拒绝（错误）将被调用的函数，通常称为`errback`

所有Dojo的Ajax方法在成功时会返回dojo/promise/Promise成功解决的问题，并在出错时被拒绝。

### 链接 ###
`then`调用的结果对于回调返回的值就像一个新的Deferred

## dojo/request ##
用于从客户端向服务器发出请求。

`dojo/request`允许您在不重新加载页面的情况下向服务器发送数据和从服务器接收数据promises和Deferreds允许更容易地编程非阻塞异步代码。

常见的配置参数：

- method：表示用于发出请求的HTTP方法的大写字符串
- sync：一个布尔值，如果为true，则导致请求阻塞
- query：包含要追加的查询参数的字符串或键值对象
- data：FromData包含数据的字符串，键值对象或对象
- timeout：在考虑请求失败和触发之前的时间（以毫秒为单位）
- handleAs：表示如何转换响应的文本有效负载的字符串
- headers：包含要随请求一起发送的额外标头的键值对象

### JSONP ###
AJAX请求仅限于当前域。如果需要从其他域请求数据，则可以使用JSONP。使用JSONP时，会在当前页面中插入脚本标记，请求src文件，服务器将数据包装在回调函数中，并且在解释响应时，将调回回调，并将数据作为其第一个参数。JSONP请求是使用`dojo/request/script`生成的。

### dojo/request/notify ###
提供了一种机制来报告使用`dojo/request`发出的请求的状态。`dojo/request/notify`使用两个参数调用模块的返回值：事件名称和侦听器函数。

dojo/request/notify支持的事件

- start
- send
- load
- error
- done
- stop

`start`和`stop`没有接受任何参数。`send`接收两个参数：表示请求的对象和取消函数。调用取消功能将在开始之前取消请求。`load`、`error`和`done`接收一个参数：代表来自服务器的响应中的对象。

### dojo/request/registry ###
提供了一种根据请求的URL路由请求的机制。注册表的常见用途时根据使用是将JSON发送到当前域还是使用JSONP发送到不同域来分配提供程序。

dojo/request/registry参数

- url：url可以是字符串，regExp或函数
	- string：如果url是字符串，如果url是完全匹配，则将使用提供程序
	- regExp：如果url是正则表达式，则在正则表达式与请求的URL匹配时将使用提供程序
	- function：如果url是一个函数，该函数将传递请求的URL和options对象。

一些小知识点：

- GET用于简单的数据请求而无需考虑安全性。GET通常比POST快。POST通常用于发送表单数据，以及何时不应在URL上传递数据。