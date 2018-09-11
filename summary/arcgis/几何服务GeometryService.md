# 几何服务GeometryService #
几何操作借助几何服务`GeometryService`完成，几何服务为几何对象提供了一系列的操作。通过几何服务可以计算几何对象的面积和长度，生成缓冲区，获取标注点，对几何对象进行投影，简化操作，以及判断几何对象之间的空间关系等。

几何服务提供的操作及说明如下图：

![](https://i.imgur.com/daHmEew.png)

关系运算是属于几何服务中的功能，在进行关系运算的时候，必须指定空间参考。

![](https://i.imgur.com/iTrKFYW.png)

## 调用GeometryService ##
	require(["esri/tasks/GeometryService"], function(GeometryService) {};

## 创建一个GeometryService对象 ##
	new GeometryService(url)


参考：

- [https://developers.arcgis.com/javascript/3/jsapi/geometryservice-amd.html](https://developers.arcgis.com/javascript/3/jsapi/geometryservice-amd.html)