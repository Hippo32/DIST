# dojo的AMD用法 #
Dojo支持以异步模块定义（AMD）格式编写的模块，这使得代码更易于编写和调试。

## 什么是模块 ##
模块是可以通过单个引用访问的值。如果您希望在模块中公开多个数据或函数，那么它们必须是表示模块的单个对象上的属性。模块开始变得更适合模块化代码——将代码分解成逻辑子集，以处理特定的功能。

## 如何创建模块 ##
使用AMD，您可以通过注册加载程序来创建一个模块。

loader是处理定义和加载模块背后的逻辑的代码(是的，它只是JavaScript!)。当你加载dojo.js或者require.js，你会得到一个AMD loader。loader定义与之交互的函数define和require。

## 如何加载模块 ##
首先，我们需要了解如何识别模块。要加载模块，您需要某种方法来识别它。AMD模块有其路径和文件名标识。

注意，我们定义的模块是对对象的引用，而不是构造函数——这意味着装载该模块的每一个代码都将得到对相同对象的引用。通常，模块返回构造函数，但是在某些情况下，返回单个对象是合适的。

## 模块加载模块 ##
当应用程序由组织良好的模块组成时，模块之间自然会有很多依赖关系。定义函数可以自动加载模块的依赖项。通过传递依赖列表来定义模块值。

## 使用插件 ##
除了常规模块外，AMD加载程序还提供了一种叫做插件的新型模块。插件是用来扩展加载程序的新特性，而不仅仅是加载AMD模块。插件的加载方式或多或少与常规模块相同，但是在模块标识符的末尾使用一个特殊的字符“!”将请求标识为插件请求。“!”之后的数据直接传递给插件进行处理。当我们看一些例子时，这将变得更加清晰。Dojo默认有几个插件;四个最重要的是dojo/text、dojo/i18n、dojo/has和dojo/domReady

### `dojo/text` ###
使用dojo /text时需要加载一个字符串从一个文件(比如HTML模板)。值将被缓存,所以后续调用加载相同的文件不会造成额外的网络请求。构建器将内联字符串加载使用dojo /text。

	"dojo/text!./templates/NavBar.html"

### `dojo/i18n` ###
dojo/i18n根据web浏览器的用户语言环境加载语言资源包。

	"dojo/i18n!./nls/common"

### dojo/has ###
Dojo的加载程序包括has.js特征检测API的实现;dojo/has插件利用这个功能有条件地要求模块。

	"dojo/has!dom-addeventlistener?./events/w3c:./events/ie"

### dojo/domReady ###
dojo/domReady是dojo.ready的替代。它是一个模块，在DOM准备好之前不会解析。

	"dojo/domReady!"

## 深入研究require ##
`require`函数接受如下参数：

1. configuration(optional, default=undefined)：带有loader配置选项的对象——这允许您在运行时重新配置loader。
2. dependencies(optional, default=[])：一组模块标识符。如果指定，这些模块将在您的代码被评估之前得到解决。它们将按照列出的顺序加载，并作为参数传递给回调函数。
3. callback：包含要运行的代码的函数取决于依赖项中的模块。您需要将代码封装在回调函数中，以便支持异步加载，并能够使用对模块的非全局引用。

有configuration的例子：

	require({
	    baseUrl: "/js/",
	    packages: [
	        { name: "dojo", location: "//ajax.googleapis.com/ajax/libs/dojo/1.10.4/" },
	        { name: "my", location: "my" }
	    ]
	}, [ "my/app" ]);

注意，并不是所有的配置选项都可以在运行时设置。尤其是异步、tlmSiblingOfDojo和预先存在的have测试，在加载器加载后不能更改。此外，大多数配置数据都是浅层复制的，这意味着您不能使用这种机制，例如，向自定义配置对象添加更多的键——对象将被覆盖。

## 深入研究define ##
`define`函数接受如下参数：

1. moduleId(optional,default=undefined)：模块标识符。这个参数主要是早期AMD加载程序的历史产物或支持前AMD Dojo，不应该提供。
2. dependencies(optional, default=[])：模块标识符数组，它们是模块的依赖项。如果指定，这些模块将在对模块进行评估之前进行解析，并按顺序将它们作为参数传递给工厂函数。
3. factory：模块的值，或将返回值的“工厂”函数。

当定义模块时，工厂函数只会调用一次，而返回值会被加载器缓存。在实际的级别上，这意味着模块可以通过加载相同的模块很容易地共享对象(类似于其他语言中的静态属性)。

	define({
	    greeting: "Hello!",
	    howAreYou: "How are you?"
	});

## loader如何工作 ##
当您调用require来加载某些模块时，loader必须找到模块的代码，然后将其作为参数传递给回调函数，以便您可以使用它。

1. 首先，loader必须解析传递的模块标识符。这包括将baseUrl与模块标识符本身放在一起，并考虑到其他配置选项所需的任何修改，如map。
2. 此时，loader为模块提供了一个URL，可以通过在页面上创建一个新的脚本元素并将src属性设置为模块的URL来加载实际的文件。
3. 一旦加载并计算文件，其结果将被设置为模块的值。
4. 加载器维护对每个模块的引用，因此下一次模块被请求时，加载器将返回现有的引用。

## 配置loader ##
由于遗留兼容性的原因，Dojo的加载程序默认以同步模式运行。我们需要显式地配置加载程序以异步运行。这是通过将async配置属性设置为true来实现的。

	<script data-dojo-config="async: true" src="js/lib/dojo/dojo.js"></script>

**在加载dojo.js之前必须设置dojoConfig变量**

	var dojoConfig = {
	    baseUrl: "/js/",
	    tlmSiblingOfDojo: false,
	    packages: [
	        { name: "dojo", location: "lib/dojo" },
	        { name: "dijit", location: "lib/dijit" },
	        { name: "dojox", location: "lib/dojox" },
	        { name: "my", location: "my", main: "app" }
	    ]
	};

- `baseUrl`(default=dojo.js文件的加载路径)：定义装载包的基本URL。
- `tlmSiblingOfDojo`(default=true)：默认情况下，加载程序期望在文件夹中找到加载器加载的文件夹中的模块
- `packages`：an array of package configuration objects。在最基本的层次上，包仅仅是模块的集合。dojo、dijit和dojox都是包的示例。但是，与目录中简单的模块集合不同，包中添加了一些额外的特性，这些特性显著提高了模块的可移植性和易用性。包配置允许你指定：
	- name：包的名字。这应该匹配包含模块的文件夹的名称。
	- location：包的位置，可以是相对baseUrl的位置也可以是绝对位置。
	- main(optional,default=main.js)：如果有人试图require包本身，则用于发现正确的模块。例如，如果您试图要求“dojo”，那么实际加载的文件是“/js/dojo/main.js”。由于我们已经为“my”包重写了这个属性，如果有人需要“my”，他们实际上会装载“/js/my/app.js”。