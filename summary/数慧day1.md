# 数慧Day1 #
前端知识图谱：[http://shooterblog.site/Learn-JS-Demo/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1/Front-End.svg](http://shooterblog.site/Learn-JS-Demo/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1/Front-End.svg)

## 安装VSCode插件 ##
参考链接：[http://shooterblog.site/2017/11/09/VsCode%E5%B8%B8%E7%94%A8%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6/](http://shooterblog.site/2017/11/09/VsCode%E5%B8%B8%E7%94%A8%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6/)
# Dojo学习 #
学习链接：[http://dojotoolkit.org/documentation/tutorials/1.10/hello_dojo/](http://dojotoolkit.org/documentation/tutorials/1.10/hello_dojo/)

Dojo的AMD加载器定义了两个使用它的全局函数：`require`和`define`。`require`可加载模块并使用它们，同时`define`允许定义自己的模块。模块通常是单个JS源文件。

AMD加载器以异步方式运行，并且在JS中，异步操作是通过回调实现的。AMD加载程序将模块作为参数传递给回调函数（与模块ID数组中指定的顺序相同）。

AMD`define`函数接受与`require`函数类似的参数：模块ID数组和回调函数。AMD加载器将回调函数的返回值存储为模块的值，因此用`require`（或`define`）加载模块的任何其他代码将接收对定义模块的返回值的引用。

## require.js ##
学习链接：

- [http://www.requirejs.cn/home.html](http://www.requirejs.cn/home.html)
- [http://www.ruanyifeng.com/blog/2012/11/require_js.html](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

require()函数接受两个参数。第一个参数是一个数组，表示所依赖的模块；第二个参数是一个回调函数，当前面指定的模块被加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

require.js要求，每个模块是一个单独的js文件。

模块必须采用特定的define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。

### `require.config()` ###
require.config()就写在主模块（main.js）的头部。require.config()参数是一个对象。

	require.config({
		baseUrl: "js/lib",
		
		paths: {
			"jquery": "jquery.min",
			"underscore": "underscore.min",
			"backbone": "backbone.min"
		}

	});

- baseUrl：如果没有显式指定config及data-main，则默认的baseUrl为包含RequireJS的那个HTML页面的所属目录。如果用了`data-main`	属性，则该路径就变成baseUrl。
	- 如果一个moduleID符合下述规则之一，其ID解析会避开常规的“baseUrl+paths”配置，而是直接将其加载为一个相对于当前HTML文档的脚本：
		- 以`.js`结束
		- 以`/`开始
		- 包含URL协议，如`http:`or`https:`
- paths属性指定各个模块的加载路径
- shim属性，专门用来配置不兼容的模块。shim配置仅设置了代码的依赖关系，想要实际加载shim指定的或涉及的模块，仍然需要一个常规的require/define调用。设置shim本身不会触发代码的加载。具体来说，每个模块要定义
	1. exports值（输出的变量名），表明这个模块外部调用时的名称
	2. deps数组，表明该模块的依赖性
- map；对于给定的模块前缀，使用一个不同的模块ID来加载该模块。
- config：常常需要将配置信息传给一个模块。这些配置往往是application级别的信息，需要一个手段将它们向下传递给模块。
- packages：从CommonJS包（package）中加载模块。
- nodeIdCompat：在放弃加载一个脚本之前等待的秒数。设为0禁用等待超时。默认为7秒。
- waitSeconds：命名一个家在上下文。
- context：指定要加载的一个依赖数组。
- deps：指定要加载的一个依赖数组。
- callback：在deps加载完毕后执行的函数。
- enforceDefine：如果设置为true，则当一个脚本不是通过define()定义且不具备可供检查的shim导出字串值时，就会抛出错误。
- xhtml：如果设置为true，则使用document.createElementNS()去创建script元素。
- urlArgs：RequireJS获取资源时附加在URL后面的额外的query参数。
- scriptType：指定RequireJS将script标签插入document时所用的type=""值。默认为"text/javascript"。


### require.js插件 ###
- domready插件，可以让回调函数在页面DOM结构加载完成后再运行。
- text和image插件，允许require.js加载文本和图片文件