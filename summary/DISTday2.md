# 数慧day2 #
前端知识图谱：[http://shooterblog.site/Learn-JS-Demo/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1/Front-End.svg](http://shooterblog.site/Learn-JS-Demo/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1/Front-End.svg)

学习计划：继续把require.js看完

## 模块化编程 ##
学习链接：

- [http://www.ruanyifeng.com/blog/2012/10/javascript_module.html](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

模块化编程的类型：

1. 原始写法：把 不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

		function m1() {
			//...
		}
	缺点：“污染”了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。
2. 对象写法

	把模块写成一个对象，所有的模块成员都放到这个对象里面。

		var module1 = new Object({
			_count : 0,
			m1 : function () {
				//...
			},
			m2 : function () {
				// ...
			}
		});
	缺点：这样的写法会暴露所有模块成员，内部状态可以被外部改写。
3. 立即执行函数写法

	可以达到不暴露私有成员的目的

		var module1 = (function() {
			var _count = 0;
			var m1 = function() {
				// ...
			};
			var m2 = function() {
				// ...
			};
			return {
				m1 : m1,
				m2 : m2
			};
		})();
4. 放大模式

	如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这是就有必要采用“放大模式”（在立即执行函数中传参，参数为大模块，并将大模块返回）

		var module1 = (function(mod) {
			mod.m3 = function() {
				// ...
			};
			return mod;
		})(module1);
5. 宽放大模式

	与“放大模式”相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象。

	var module1 = (function(mod) {
		//...
		return mod;
	})(window.module1 || {});
6. 输入全局变量

	为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

	var module1 = (function($, YAHOO) {
		// ...
	})(jQuery, YAHOO);

	这样做，除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

## require.js ##
学习链接：

- [http://www.ruanyifeng.com/blog/2012/11/require_js.html](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [http://www.requirejs.cn/docs/api.html](http://www.requirejs.cn/docs/api.html)

### require.js的加载 ###
将require.js下载下来，假定把它放在js子目录下

	<script src = "js/require.js" defer async="true"></script>
async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。

加载自己的主模块。

	<script src = "js/require.js" data-main = "js/main"></script>
data-main属性的作用是，指定网页程序的主模块。

### 主模块的写法 ###
主模块依赖于其他模块，使用AMD规范定义的require()函数。

require()函数接受两个参数。第一个参数是数组，表示所依赖的模块；第二个参数是一个回调函数，当前指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

	// main.js
	require(['moduleA', 'moduleB', 'moduleC'], function(moduleA, moduleB, moduleC) {
		// ...
	});

### 模块的加载 ###
使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js)的头部。参数就是一个对象。

### AMD模块的写法 ###
require.js加载的模块，采用AMD规范。也就是说，模块必须按照AMD的规定来写。

具体来说，就是模块必须采用特定的define()函数来定义。

定义的模块不依赖其他模块：

	// math.js
	difine(function () {
		var add = function(x, y) {
			return x + y;
		};
		return {
			add : add
		};
	});
定义的模块依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。

	define(['myLib'], function(myLib) {
		function foo() {
			myLib.doSomething();
		}
		return {
			foo : foo
		};
	});

### 加载非规范的模块 ###
没有采用AMD规范编写的模块，如果要加载它们的话，必须先定义它们的特征。

用shim属性，专门用来配置不兼容的模块具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。

### 循环依赖 ###
在模块定义好后用require()方法再获取（记得将require作为依赖注入进来）

### JSONP服务依赖 ###
JSONP是js中服务调用的一种方式。它仅需简单地通过一个script标签发起HTTP GET请求，是实现跨域服务调用一种公认手段。

为了在requirejs中实现JSON服务，需要将callback参数的值指定为“define”。这意味着你可将获取到的JSONP URL的值看成是一个模块定义。

### `requirejs.undef()` ###
重置loader的内部状态以使其忘记之前定义的一个模块。该功能仅在无其他模块持有该模块时的错误处理中。

### about requirejs ###
- require引入的文件（模块），只会解释执行一次，所以引入的模块也可用作全局变量。

## Dojo入门 ##
### dom函数 ###
### dojo/query ###
`dojo/query`模块使用熟悉的CSS查询来检索节点列表。



## ArcGIS ##
学习链接：[https://developers.arcgis.com/javascript/3/](https://developers.arcgis.com/javascript/3/)