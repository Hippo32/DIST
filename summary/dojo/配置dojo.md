# 配置dojo #
2018/8/6

`dojoConfig`对象是在网页或应用程序中配置Dojo的主要机制。它由模块加载器以及具有全局选项的Dojo组件引用。如果需要，它还可以用作自定义应用程序的配置点。

**`dojoConfig`在加载dojo.js之前在脚本块中定义。如果相反，配置属性将被忽略。**

要注意区分`dojoConfig`和`dojo/_base/config`是很重要的。`dojoConfig`仅用于输入目的——这是我们向加载程序和模块传递配置参数的方式。在引导过程中，将从这些参数中填充dojo/_base/config，以便以后由模块代码进行查找。

## has()配置 ##
使用has()进行特性检测。我们可以在dojoConfig中为has()特性集指定特性

## Debug/Firebug Lite配置 ##
要为旧版本的Internet Explorer启用Firebug Lite的调试帮助，我们可以设置dojo-firebug特性。如果您有Firebug或另一个可用的控制台并打开，它什么也不做。但是如果没有控制台，它将加载Dojo的Firebug Lite版本，并在页面底部创建控制台UI。

要为不赞成的和实验的特性启用调试消息，我们可以将dojo-debug消息设置为true(默认为false，除非您设置了isDebug)。如果该特性被设置为false，这些警告将被禁止。例如，要启用开发控制台(提供浏览器或使用Firebug Lite)并记录调试消息:

	<script>
		dojoConfig = {
			has: {
				"dojo-firebug": true,
				"dojo-debug-messages": true
			}
		};
	</script>
以下附加选项可用于进一步配置此页面控制台:

- `debugContainerId`：指定包含控制台UI的特定元素
- `popup`：使用弹出窗口，而不是将控制台呈现到当前窗口

## Loader配置 ##
可参考[dojo的AMD用法的配置loader](https://github.com/Hippo32/DIST/blob/master/summary/dojo%E7%9A%84AMD%E7%94%A8%E6%B3%95.md#%E9%85%8D%E7%BD%AEloader)

- `baseUrl`：在将模块标识符转换为路径或URL时预写的基本URL。

		baseUrl: "/js"
- `packages`：提供包名和位置的对象数组

	    packages: [{
	        name: "myapp",
	        location: "/js/myapp"
	    }]
- `map`：允许您将模块标识符中的路径映射到不同的路径

	    map: {
	        dijit16: {
	            dojo: "dojo16"
	        }
	    }
- `paths`：模块ID片段到文件路径的映射

		var dojoConfig = {
		    packages: [
		        "package1",
		        "package2"
		    ],
		    paths: {
		        package1: "../lib/package1",
		        package2: "/js/package2"
		    }
		};
		
		    // ...is equivalent to:
		var dojoConfig = {
		    packages: [
		        { name: "package1", location: "../lib/package1" },
		        { name: "package2", location: "/js/package2" }
		    ]
		};
- `async`：定义是否应该异步加载Dojo核心。值可以是true、false或legacyAsync，它将加载器永久地放置在遗留的跨域模式中。

		async: true
- `parseOnLoad`：如果为真，则在DOM和所有初始依赖项(包括dojoConfig.deps数组中的依赖项)加载时使用dojo/parser解析页面。

		parseOnLoad: true
	建议将parseOnLoad保留为false(它默认为false，因此您可以省略此属性)，并且开发人员明确要求dojo/parser并调用parser.parse()。
- `deps`：一个资源路径数组，在Dojo加载后应该立即加载

		deps: ["dojo/parser"]

- `callback`：在获取deps之后执行的回调

	    callback: function(parser) {
	        // Use the resources provided here
	    }
- `waitSeconds`：在发送模块加载超时信号之前等待的时间量;默认为0(永远等待)

		waitSeconds: 5
- `cacheBust`：如果为真，则将时间作为查询字符串附加到每个模块URL，以避免模块缓存

		cacheBust: true

## 区域设置和国际化 ##
您可以使用Dojo的dojoConfig的i18n基础设施将语言环境配置为用于任何小部件或本地化内容。locale选项允许您重写浏览器提供给Dojo的默认值。一个简单的演示展示了它的工作原理:

	locale: location.search.match(/locale=([\w\-]+)/) ? RegExp.$1 : "en-us"
在演示中，我们定义了dojoConfig对象的locale属性，我们从查询字符串中查找locale=xx参数。这是一个演示工件;通常，您可能会硬编码区域设置。在任何模块加载之前设置语言环境，确保在需要时加载正确的本地化消息包依赖项。在本例中，我们使用dojo/date/locale模块将日期对象格式化为对话框标题的本地化字符串。

当使用dojo/parser时，位于祖先DOMNode上的lang=设置将覆盖dojoConfig.lacale设置。这种行为将在Dojo 2.0中改变。您还可以指定每个小部件的langfor，覆盖dojoConfig.locale。只设置该小部件的区域设置。

## 自定义属性 ##
因为dojo.config始终是已知的，并且是提供页面范围配置的逻辑位置，Dojo中其他几个模块使用它来实现自己的特定配置属性。我们在Dijit中看到了这一点，尤其是在DojoX中，可以设置模块标志和行为: