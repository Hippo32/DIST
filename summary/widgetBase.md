## _WidgetBase ##
了解Dijit系统最重要的事情是小部件的生命周期。

### Dijit生命周期 ###
每个继承自dijit._WidgetBase的小部件在实例化时都会经历下面的方法调用 

- `constructor`（所有原型调用，实例化时调用）
- `postscript`（使用的所有原型通用`declare`）
	- `create`
		- `postMixInProperties`
		- `buildRendering`
		- `postCreate`
- `startup`

这些方法的作用

1. 从默认值和运行时值初始化小部件数据
2. 为小部件的可视表示生成DOM结构
3. 将小部件的DOM结构放在页面中
4. 处理依赖于文档中DOM结构的逻辑(比如DOM元素维度)

### postCreate() ###
当widget的所有属性都已定义，且代表该widget的DOM结构已被创建（但在连入住DOM树之前）时，这个方法被调用。在开发一个自定义widget时，大多数的定制都会出现在这个函数中。

### startup() ###
这个方法在widget的DOM结构被连入主DOM树之后被调用。在该函数之前，这个widget的所有子widget都已被创建并启动了。这个函数对弈复合widget（例如布局widget）是非常有用的。

**注意：**当使用编程方式初始化一个widget时，务必调用startup方法，且必须在将该widget放置到文档DOM树中以后再调用。

### 销毁方法 ###
除了初始化方法之外，dijit/_WidgetBase还定义了一些销毁方法（以调用顺序列出）：

- `destroyRecursive`
	- `destroyDescendants`
	- `destroy`
		- `uninitialize`
		- `destroyRendering`

在创建自己的widget时，任何必要的自定义销毁行为都必须定义在destroy方法中（别忘了调用this.inherited(arguments))。

**注意：**虽然destroy是销毁widget的核心方法，但在显式销毁一个widget时最好调用destroyRecursive。这个方法能保证该widget的所有子widget也被销毁。

### DOM节点引用 ###
_WidgetBase定义了一个属性，叫做`domNode`，它是囊括这个widget的DOM节点的引用。如果你需要对widget的DOM树做某些操作，你随时可以获取这个节点的引用。而且这个引用在postCreate被调用时就已经存在了。

某些widget还定义了`containerNode`属性。这个对widget的一个内部节点的引用，这个节点里包含了一些HTML内容甚至是其他widget

### Getter和Setter ###
在撰写你自己的widget时，对于任何需要特殊逻辑来实现自定义属性的获取和修改的情况，你都应该创建对应的getter和setter方法。而在使用你自己的widget时，也必须总是通过get()和set()方法来访问属性。只有这样才能正确地调用自定义的getter和setter逻辑。另外，在创建自定义的setter方法时，你应当总是使用内部的_set方法来更新内部值，从而使dojo/Stateful的watch方法能正常工作。这个dojo/Stateful也是所有widget都继承的基类

### 监听事件和主题 ###
_WidgetBase为Dojo的两个最重要的事件机制on()和subscribe()提供了封装。

在widget的基础设施中定义on和subscribe的好处是，widget能够跟踪它的所有事件和主题订阅，保证它们在widget被销毁时被正确地取笑绑定（或取消订阅），从而避免内存泄漏。

### 预定义的属性和方法 ###
最后，_WidgetBase提供了一组预定义的属性，以及对应的getter和setter：

- id：用于标识该widget的唯一字符串
- lang：一个很少用到的字符串属性，用于覆盖默认的DOjo locale
- dir：有Bidi需求时很有用
- class：widget的domNode的HTML class属性
- style：widget的domNode的HTML style属性
- title：通常是指原生的工具提示HTML title属性
- baseClass：widget的根CSS class
- srcNodeRef：在widget被“控件化”之前存在的DOM节点（如果有的话）。注意对于某些widget（例如模板widget）这个属性将在postCreate后被重置，因为原有的节点已被丢弃了。




## _TemplateMixin ##
使用`_TemplatedMixin`和`_WidgetsTemplateMixin`，你可以快速地创建高可维护性、快速修改和易于操作的widget。

`_TemplatedMixin`的基本概念：可以让开发人员创建一个带有一些小扩展的小HTML文件，并在运行时（或在build过程中）将这个HTML文件当做字符串加载，提供给这个模板的widget的所有实例进行重复使用。

**注意：**`_TemplatedMixin`旨在用作混入，而不是直接继承。在基于类的语法中，意味着它相比于类更像是一个接口

### _TemplatedMixin提供什么 ###
- 额外属性：
	
		templateString // 表示模板HTML的字符串
- 重写定义在Dijit widget架构的两个方法
	- buildRendering：处理模板的解析与填充
	- destroyRendering：正确地销毁widget的DOM
	
		因为这两个方法都是模板处理的关键，如果你在自定义代码中重写了两者之一——确保在重写的俄方法中添加`this.inheriented(arguments)`来包含一个对父版本的调用。

### 使用_TemplatedMixin ###
要让你的自定义widget模板化，你要做的就是将`dijit/_TemplateMixin`作为你widget类声明数组的第二个或之后的参数。

使用`templateString`属性与通过`dojo/text!{path}`加载的模块相结合。这个引用模块文件的推荐方式，它可以确保文件异步加载，并在创建Dojo工具集的build时正确地整个。

## 编写模板 ##
模板时你定义的DOM结构中的一个HTML文档片段，它有一些特殊的“挂钩”来将一些事情绑定到你的widget声明。

Dijit模板系统最重要的三个方面：变量替代、附加点和事件附着。

注意当你定义一个模板时，它只能有一个根节点定义（就像XML文档）。不允许在最高级存在多个节点。

### 变量替代 ###
通过使用简单的变量占位符语法，模板可以在DOM渲染的时候设置值，像这样：

	${property}
widget中声明的任何属性或字段定义都可以作为变量名。如果属性是引自一个对象，而你想要使用这个对象中一个属性的值，可以使用正常的对象引用符号。

为了防止`_TemplatedMixin`转义字符串中的引号，在完整的变量名前加一个!。

只推荐针对在widget生命周期中不会发生变化的值再模板中使用变量替代。也就是说，如果在widget生命周期期间你想要编程式地设置一个属性值，推荐你使用widget的`postCreate`方法来通过`set()`方法编程式地设置任何变量。

### 附加点 ###
Dijit的模板系统有一个特殊属性，它会在你的模板中查找一个叫做attach point——用HTML5 data属性语法实现。一个附加点告诉模板渲染器当一个`data-dojo-attach-point`属性的DOM元素创建时，将这个属性的值设置为你widget的一个属性，作为创建的DOM元素的引用。

通常，你模板的根节点会变成你的widget的`domNode`属性，因此你通常不需要在你的定义中包含这个附加点。
### containerNode 附加点 ###
Dijit也定义一个名叫containerNode的附加点。containerNode的基本思想是当声明式创建widget时，为额外的标签提供位置。

当dojo解析器解析文档时，它将找到我们的实例widget并将其实例化——作为实例化的一部分，widget中的所有标签都将追加到containerNode中。

### 事件附着 ###
Dijit模板系统还提供了一个方式将原生的DOM事件附加到自定义widget的方法中。它使用HTML5 data属性`data-dojo-attach-event`。这是一个逗号分隔的键值对（用冒号分隔）字符串，键是要附加处理器的原生DOM事件，值是事件触发时你的widget要执行的方法名。如果只有一个事件需要处理，省略尾部逗号。

当你的widget实例化并且由模板创建了DOM片段，Dijit模板系统将随后检查所有附加事件定义，并自动将这些事件（使用`dojo/on`）与结果DOM和你的widget对象相连接——让可视化表示与控制代码之间的连接变得非常简单。另外，当这些事件处理器触发时，原生DOM事件机制传递的参数也会传递给你的widget处理器，如此你就可以完全地访问浏览器的报告。

`dijit/_OnDijitClickMixin`：添加了一个改进事件，比标准的DOM`onclick`事件支持更多的功能。

### _WidgetsInTemplateMixin混合 ###
Dijit的模板系统还能用模板来创建更加复杂的widget。这个混合类告诉模板系统你的模板中还有其他的widget，当你的widget实例化时也将它们实例化。

## 创建自定义Dojo小部件 ##
步骤：

1. 创建必要的小部件目录结构
2. 创建展示单个作者的HTML标记
3. 在第二点的基础上把这些标记变成Dijit模板
4. 使用Dojo.declare来创建我们的小部件类
5. 进行必要的CSS美化

参考链接：

- [深入理解_WidgetBase](https://blog.csdn.net/dojotoolkit/article/details/7860938)
- [创建基于模板的widget](https://blog.csdn.net/taijiedi13/article/details/55252001)
- [创建自定义Dojo小部件(Widget)](https://blog.csdn.net/dojotoolkit/article/details/6688058)