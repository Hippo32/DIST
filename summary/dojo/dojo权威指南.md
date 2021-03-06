# Dojo权威指南 #
Base封装的功能包括各种Ajax调用、基于CSS选择符语法的DOM查询、标准事件传播机制和函数式编程的实用程序（如map和filter）等。

Core中包含的一些特性涉及动画方法（dojo.fx)、拖放工具（dojo.dnd)、数据管理层（dojo.data)、cookie处理（dojo.cookie)等。

## 理解闭包 ##
闭包本质上是数据与包含（或封闭）数据的作用域的结合体。包含一些函数的全局作用域通常比较容易理解，但嵌套的函数则具有一种特殊能力。

在JS中，函数是可以作为数据传递、可以赋值给变量的“一类”对象。Dojo的许多设计模式都利用了函数的这个特性。

作者推荐看《JavaScript权威指南》中关于闭包的分析。

以下是《JavaScript权威指南》中关于闭包的分析：

JavaScript采用词法作用域，也就是说，函数的执行依赖于变量作用域，这个**作用域是在函数定义时决定的，而不是函数调用时决定的**。

词法作用域的基本规则：JavaScript函数的执行用到了作用域链，这个作用域链是函数定义的使用创建的。

每次调用JavaScript函数的时候，都会为之创建一个新的对象用来保存局部变量，把这个对象添加至作用域链中。当函数返回的时候。就从作用域链中将这个绑定变量的对象删除。如果不存在嵌套的函数，也没有其他引用指向这个绑定对象，它就会被当做垃圾回收掉。如果定义了嵌套的函数，每个嵌套的函数都各自对应一个作用域链，并且这个作用域链指向一个变量绑定对象。如果这个函数定义了嵌套的函数，并将它作为返回值返回或者存储在某处的属性里，这时就会有一个外部引用指向这个嵌套的函数。它就不会被当做垃圾回收，并且它所指向的变量绑定对象也不会被当做垃圾回收。

## 环境 ##
关于this、call、apply

## 匿名函数 ##
JavaScript有一个不起眼但很重要的特性，即它不支持函数外部的块级作用域。因此，在循环过程或者条件逻辑中定义的任何“临时”变量，都会在其所在的块执行后继续存在。

如果有必要明确地提供一个块级作用域，那么可以把这个块包含在一个Function对象中，并直接在代码中调用该Function对象。

	(function() {
		for (var i=0; i < 10; i++) {
			// 对i进行操作
		}
	})()
	console.log(i); // undefined


## Dojo工具箱概述 ##
![Dojo组件之间的关系](https://i.imgur.com/P4Oo23j.png)

- Base：Dojo的内核，是一个极其简洁、高度优化的库，也是工具箱中其他部分的基础。提供了便捷的语言和Ajax实用程序，提供了开发人员可以用来动态加载Dojo资源的打包系统。还提供了可以用来创建和操作具有继承性层次结构的工具，一种使用CSS3选择符来查询DOM的手段和一种跨浏览器标准化DOM事件的构造。
- Core：基于Base构建，提供了解析部件、高级动画效果、拖放工具、国际化（i18n）、后退按钮处理、管理cookie等方面的功能。
- Dijit：Dojo widget。提供大量即装即用的部件，而且使用这些部件通常不需要编写任何JavaScript代码。Dijit直接构建于Core（因而强烈依赖于Core的完整性），如果开发人员要使用自己设计的部件，那么就会用到与使用Dijit部件时用到的完全相同的构建块。Dijit中的部件可以粗略地分类为通用部件、布局部件和表单部件。通用部件的例子有进度条和模态对话框，布局部件的例子有选项卡容器和折叠窗格，而表单部件则提供了按钮和各种输入元素等原有表单元素的超级增强版。
- DojoX：是一组子项目的集合，这些子项目的正式含义是“Dojo扩展”。
- Util：是一个Dojo实用程序的集合，其中包括一个JavaScript单元测试框架和一些用于创建自定义的Dojo版本（针对产品开发）的构建工具。构建工具的作用是减少代码文件的大小，并将它们整合到一个由多层构成的文件集合中，集合中的每一层将只包含一组JavaScript文件。

要区分Base与Core很容易：任何必须显式导入到页面中的模块或资源，如果它与dojo命名空间有关系，那么它就属于dojo.js外部的Core。Core的功能通常不会存在于Base级别的命名空间中，而是位于dojo.fx或dojo.data这样较低级别的命名空间中。

注意：所有JavaScript对象都继承自JavaScript内置的Object类型，并且都有一个prototype属性。JavaScript正是以这些prototype属性为基础实现了基于原型链的强大继承机制。在Dojo的语境下，构造函数这个术语同样也可以指dojo.declare的关联数组参数中映射到constructor键的匿名函数。这个匿名函数的主要作用就是初始化Dojo类的属性。

dojo.require的一个极其重要的特点就是它对工具箱的本地安装执行同步加载，而在跨域加载工具箱时则执行异步操作。

由于相互竞争的请求之间的时间选择不可预知而导致的结果不明确被称为**竞态条件**。

### 平台配置 ###
`djConfig`可以是一个关联数组，该数组必须在加载dojo的SCRIPT标签之前定义；或则，也可以作为加载Dojo的SCRIPT标签的一个属性存在。

确定是跨域加载还是本地加载Dojo。

### 字符串工具`dojo/string` ###
- trim：去空格
- pad：插入字符串值并填充指定数量的字符。在默认情况下，每次都在左侧插入字符。提供可选参数会导致从右侧插入字符。`string.pad = function(/*String*/text, /*Integer*/size, /*String?*/ch, /*Boolean?*/end)`
- substitute：对字符串进行参数式置换。
- rep：重复字符串指定次数

### 数组处理`dojo/_base/array` ###
- indexOf：在元素存在的情况下都会返回表示该元素索引的整数值，而如果元素不存在则返回-1。`indexOf: function(arr, value, fromIndex, findLast)`
- lastIndexOf：`lastIndexOf: function(arr, value, fromIndex)`
	- 上面两个方法，它们执行浅比较。所谓浅比较，对于像数组这样比较复杂的数据类型而言，意味着它们只比较引用。
- every和some：确定是否数组中的每个元素都符合某个特定条件，或者只有其中部分元素符合该条件。
	- 参数：一个数组，一个用于测试数组中每个元素的函数（每个元素都要传递给这个函数），以及一个可选的参数，用于提供测试函数的环境（this）。
	- every(array, callback, scope)：该方法用来判断是否数组的全部元素都满足特定的条件
	- some(array, callback, scope)：该方法用来判断数组中是否至少有一个元素满足特定的条件
- forEach：将每个数组元素作为参数传递给一个函数，并且不返回任何值
	- forEach: function(arr, callback, thisObject)
		- arr: Array|String
		- callback: Function|String
		- thisObject: Object?
- map和filter：对每个数组元素应用自定义逻辑以及返回另外一个数组并且不会修改原始数组。
	- map(array, callback, scope)：该方法迎来对数组中的每个元素执行操作，并返回一个数组包含操作的结果
	- filter(array, callback, scope)：该方法用来对数组中包含的元素进行过滤，只保留满足特定条件的元素。



# dojoConfig #
dojoConfig一定被定义在dojo.js加载之前。

## `dojoConfig`和`dojo/_base/config`的区别 ##
dojoConfig仅用于输入目的——这是我们向加载程序和模块传递配置参数的方式。

在引导过程中，将从这些参数中填充dojo/_base/config，以便以后由模块代码进行查找

# dojo/_base/fx and dojo/fx #
- `dojo/_base/fx`提供以前在Dojo base中找到的基本效果方法，包括：`animateProperty`，`anim`，`fadeIn`，and `fadeout`.
- `dojo/fx`提供了更高级的效果，包括：`chain`，`combine`，`wipeIn`，`wipeOut` and `slideTo`

## `dojo/_base/fx` ##
- 淡进或淡出
