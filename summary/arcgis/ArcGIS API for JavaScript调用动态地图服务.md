# ArcGIS API for JavaScript调用动态地图服务 #
在ArcGIS API中给我们提供了一个类叫做`ArcGISDynamicMapServiceLayer`，利用这个类，我们可以获得发布的地图服务。调用动态地图服务一般只需要两步：

1. 通过地图服务的URL创建一个`ArcGISDynamicMapServiceLayer`对象
2. 将动态地图服务的对象添加到地图容器中

示例代码：

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Hello World</title>
	    <link rel="stylesheet" type="text/css" href="http://localhost/arcgis_js_api/library/3.17/3.17/dijit/themes/tundra/tundra.css"/>
	    <link rel="stylesheet" type="text/css" href="http://localhost/arcgis_js_api/library/3.17/3.17/esri/css/esri.css" />
	    <script type="text/javascript" src="http://localhost/arcgis_js_api/library/3.17/3.17/init.js"></script>
	    <script>
	        require(["esri/map","esri/layers/ArcGISDynamicMapServiceLayer",
	                    "dojo/domReady!"],
	                function(Map,ArcGISDynamicMapServiceLayer){
	                    var map = new Map("mapDiv");
	                    //利用url创建一个动态地图服务对象
	                    var layer=new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/Test/MyServer/MapServer");
	                    //将地图服务对象添加到地图容器中
	                    map.addLayer(layer);
	                })
	    </script>
	</head>
	<body class="tundra">
	<div id="mapDiv" style="width:900px; height:600px; border:1px solid #000;"></div>
	</body>
	</html>

## 动态地图服务的功能需求 ##
- 根据需求隐藏服务中的某一个图层（动态地图服务可以实现，但是切片地图服务就不能实现）
- 通过属性查询地图服务中的信息
- 通过空间查询地图服务中的信息（包括点查询，线查询，面查询等等）


参考文章：

- [https://www.cnblogs.com/sguozeng/articles/6423227.html](https://www.cnblogs.com/sguozeng/articles/6423227.html)