# ArcGIS API For JavaScript 之GraphicsLayer #
`GraphicsLayer`是一种客户端图层，并不对应到服务器端的某个地图服务，用于在客户端展现各种数据，如绘制的图形，查询返回的结果等。GraphicsLayer在客户端数据表达方面有非常重要的作用，它可以根据各种请求动态地在客户端显示一些符号化的几何对象——Graphic。

`GraphicsLayer`是一个包含多个Graphic的容器，而Graphic则是一个包含了图形、符号、属性及一个弹出提示框的元素。它显示在一个GraphicsLayer上，通过GraphicsLayer可以监听发生在Graphic身上的事件。

在map中默认最顶层为一个`GraphicsLayer`图层，获取为`map.Graphics`，同时可以声明独立的`GraphicsLayer`图层加载到map中去，即map中可以加载多个`GraphicsLayer`，同时`GraphicsLayer`之间可以进行排序，但在map中`GraphicsLayer`只能放在最顶部，即其他图层之上，包括`TiledMapServiceLayers`和`DynamicMapServiceLayers`。

在使用`GraphicsLayer`的时候，我们可以新建一个图层对象，也可以使用地图默认的`GraphicsLayer`，默认对象通过`Map.graphics`获取。

`GraphicsLayer`经常和Draw工具搭配使用，`GraphicsLayer`用来将Draw工具绘制的图形进行显示和符号化。

## 声明一个新的GraphicsLayer ##
- `esri.layers.GraphicsLayer`

	直接声明一个空的没有进行任何设置的GraphicLayer：

		var graphicsLayer = new esri.layers.GraphicsLayer();
- `esri.layers.GraphicsLayer(options?)`

	通过参数设置声明新的GraphicLayer

	|options list|description|
	|---|---|
	|`<String>`className|为层的节点设置的类属性。|
	|`<String or String[]>`dataAttributes|要作为自定义数据属性添加到图形节点的属性字段列表。只适用于层表面类型为“svg”的情况。对于其他表面类型，忽略此选项。|
	|`<Boolean>`displayOnPan|如果为true，图形的平移过程中显示。为false时，图形的水平运动期间关闭。设置为false，可以提高性能，在Internet Explorer中。默认值是true。|
	|`<String>`id|Id to assign to the layer. If not assigned, esri.Map assigns value.|
	|`<InfoTemplate>`infoTemplate|The info template for the layer.|
	|`<Number>`opacity|图层透明度。值的范围从0.0到1.0之间，0.0是100％透明，1.0没有透明度。默认值是1.0。不支持Internet Explorer。|
	|`<Number>`retreshInterval|层的刷新间隔以分钟为单位。非零值在指定的间隔设置自动层刷新。|
	|`<Boolean>`styling|只适用于层表面类型为“svg”的情况。对于其他表面类型，忽略此选项。|
	|`<Boolean>`visible|图层是否可见，默认为true|

例子：

	require([
	  "esri/layers/GraphicsLayer", ... 
	], function(GraphicsLayer, ... ) {
	  var graphicsLayer = new GraphicsLayer({opacity:0.20});
	  ...
	});

## 通过map.addLayer(graphicsLayer)方法加载到当前的地图中去 ##


## 主要的属性和方法 ##
![](https://i.imgur.com/Ex8ewzV.png)

![](https://i.imgur.com/2ACFsuc.png)

## infoWindow ##
`GraphicsLayer`图层的`infoWindow`主要是把infoWindow添加到每一个esri.Graphic元素当中而不是添加到GraphicsLayer图层里。添加到GraphicsLayer图层中就会使得单击那个地方都会弹出infoWindow，而添加到esri.Graphic中，只有单击到元素时才会弹出infoWindow。


参考：

- 中文部分属性和方法：[https://blog.csdn.net/jixg1800/article/details/8426598](https://blog.csdn.net/jixg1800/article/details/8426598)
- 官网：[https://developers.arcgis.com/javascript/3/jsapi/graphicslayer-amd.html#graphicslayer2](https://developers.arcgis.com/javascript/3/jsapi/graphicslayer-amd.html#graphicslayer2)
- [infoWindow](https://blog.csdn.net/Void_J/article/details/52412795)





