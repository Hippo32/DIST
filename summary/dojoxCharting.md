# dojox/charting #
创建dojox/charting系统的目的是通过允许开发人员从不同的数据集创建动态、惟一和功能性的图表来减轻这些痛苦。此外，dojox/charting提供了许多主题和图表类型，允许开发人员以任何他们想要的方式显示数据。

Dojo的图库表存在于`dojox/charting`资源中。它：

- 允许使用HTML(声明式)或JavaScript(编程式)创建图表
- 几乎适用于所有设备。
- 可以用SVG、VML、Silverlight和Canvas呈现图表。支持SVGWeb渲染的工作也在进行中。
- 允许开发人员决定使用哪个渲染器
- 评估客户端并根据客户端支持的内容使用适当的渲染器
- 创建带有dojox/gfx的图表，这是一个强大的矢量图形库，可以使图表以多种方式进行动画。
- 它包含了许多吸引人的、多样化的主题
- 允许在图表主题内使用线性和径向渐变(甚至可以在Internet Explorer中使用!)

## 配置dojox/charting ##
	require([
	     // Require the basic 2d chart resource
	    "dojox/charting/Chart",
	
	    // Require the theme of our choosing
	    "dojox/charting/themes/Claro",
	
	], function(Chart, theme){
	    // ....
	}


## 创建一个基本的图表 ##
创建基本图表有两种方法:声明式和编程式。然而，在创建图表之前，首先创建/访问数据是很重要的。
## 图表组件 ##
### Plots（图） ###
### Axes（轴） ###
### Series（系列） ###

翻译链接：

[Dojo1.11官方教程文档翻译（5.2）图表](https://blog.csdn.net/taijiedi13/article/details/54425590)

[Dojo1.11官方教程文档翻译（5.3）图表进阶](https://blog.csdn.net/taijiedi13/article/details/54581939)