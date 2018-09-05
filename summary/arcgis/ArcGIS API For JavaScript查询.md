# ArcGIS API For JavaScript查询 #
Esri给我们提供了三个累用于实现矢量数据查询功能：`FindTask`，`QueryTask`，`IdentifyTask`。它们之间的区别为：

- `FindTask`只能进行属性查询，`QueryTask`，`IdentifyTask`两个类既可以进行属性查询也可以进行空间查询。
- 对于`QueryTask`，`IdentifyTask`两个类，`QueryTask`只可应用于一个单独的图层，`IdentifyTask`可应用于地图服务和多个图层。
- `QueryTask`可以进行简单的统计功能。

## FindTask ##
允许对地图中一个或多个图层的要素进行基于属性字段值的查询。`FindTask`不能进行空间查询，因为`FindTask`可以对多个图层进行查询，所有它的url属性需要指向所查询的地图服务的REST URL，而不像`QueryTask`需要指定某个图层的URL。

`FindTask`通过`FindParameters`类来设置查询参数，执行`search.execute(FindParameters, function(result))`

设置查询参数：

- `returnGeometry`：是否返回Geometry；
- `layerIds`：要查询图层的ID；
- `searchFields`：通过哪个字段来查询；
- `searchText`：查询字段匹配值

		var params = new FindParameters();
		params.returnGeometry = true;
		params.layerIds = [0, 1, 2];
		params.searchFields = ["name"];
		params.searchText = $("#searchParam").val();

查询的返回结果：返回的是一个FindResults数组，FindResults[i].feature可以加入到GraphicsLayer上显示，也可以通过Attributes属性字段得到属性信息

## QueryTask ##
`QueryTask`是一个进行空间和属性查询的功能类，它可以在某个地图服务的某个子图层内进行查询。`QueryTask`进行查询的地图并不必须加载到Map中进行显示。

`QueryTask`的执行需要两个先决条件：一个是需要查询的图层URL，一个是进行查询的过滤条件。

查询的返回结果：返回的是一个FeatureSet。FeatureSet.featurns[i]可以加入到GraphicsLayer上显示，也可以通过Attributes属性字段得到属性信息。

### QueryTask实现空间查询 ###

	function queryGraphic(geometry) {
		// 创建查询对象，注意：服务的后面有一个编号，代表对哪一个图层进行查询
		var queryTask = new QueryTask("http://localhost:6080/arcgis/rest/services/Test/MyService/MapServer/1");
		// 创建查询参数对象
		var query = new Query();
		// 空间查询的几何对象
		query.geometry = geometry;
		// 服务器给我们返回的字段信息，*代表返回所有字段
		query.outFields = ["*"];
		// 空间参考信息
		query.outSpatialReference = map.spatialReference;
		// 查询的标准，此处代表和geometry相交的图形都要返回
		query.spatialRelationship = Query.SPATIAL_REL_TNTERSECTS;
		// 是否返回几何信息
		query.returnGeometry = true;
		// 执行空间查询
		queryTask.execute(query, showQueryResult);
	}

`Query`类是`QueryTask`参数类，用于设定空间查询的参数。

`QueryTask`类中有一个方法叫做`execute`，`execute`的第一个参数是查询的参数，第二个参数是一个回调函数（即是一个异步函数），当服务器返回数据时，此函数才会被触发。

### QueryTask实现属性查询 ###
	//给属性查询按钮添加click事件
	on(dom.byId("Btn"),"click",function(e){
	    //定义查询对象
	    var queryTask = new QueryTask
	    ("http://localhost:6080/arcgis/rest/services/Test/MyService/MapServer/1");
	    //定义查询参数对象
	    var query = new Query();
	    //查询条件，类似于sql语句的where子句
	    query.where = "name = 'J4'";;
	    //返回的字段信息：*代表返回全部字段
	    query.outFields = ["*"];
	    //是否返回几何形状
	    query.returnGeometry = true;
	    //执行属性查询
	    queryTask.execute(query, showQueryResult);
	})

处理返回的结果信息

	function showQueryResult(queryResult) {
        //创建线符号
        var lineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 3);
        //创建面符号
        var fill=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol);
        if (queryResult.features.length == 0) {
            dom.byId("divShowResult").innerHTML = "";
            return;
        }
        var htmls = "";
        if (queryResult.features.length >= 1) {
            htmls = htmls + "<table style=\"width: 100%\">";
            htmls = htmls + "<tr><td>名称</td></tr>";
            for (var i = 0; i < queryResult.features.length; i++) {
                //得到graphic
                var graphic = queryResult.features[i];
                //给图形赋予符号
                graphic.setSymbol(fill);
                //添加到地图从而实现高亮效果
                map.graphics.add(graphic);
                //获得教学楼的名称信息，此处应和shp的属性表对应
                var ptName = graphic.attributes["alias"];
                if (i % 2 == 0)
                    htmls = htmls + "<tr>";
                else
                    htmls = htmls + "<tr bgcolor=\"#F0F0F0\">";
                htmls = htmls + "<td><a href=\"#\"\">" + ptName + "</a></td>";
                htmls = htmls + "</tr>";
            }
            htmls = htmls + "</table>";
            //将教学楼的名称信息和divShowResult绑定
            dom.byId("divShowResult").innerHTML = htmls;
        }
    }


## IdentifyTask ##
是一个在地图服务中识别要素（Feature）的功能类。通过`IdentifyTask`可以搜索地图层中与输入几何形相交的要素。因为也是在多个图层中查询，所以Task的URL是动态图层服务的地址。同样，返回的要素都可以作为Graphic被添加到地图的GraphicsLayer上。

`IdentifyTask`的使用与`QueryTask`十分类似，唯一不同的是`IdentifyTask`可以作用于多个图层，而`QueryTask`是作用于一个图层的

`IdentifyTask`通过`IdentifyParameters`类来设置查询参数，执行execute方法来来查询。

设置查询参数：

- `returnGeometry`：是否返回几何信息
- `layerIds`：要查询的图层
- `layerOption`：查询条件，参考常量表
- `geometry`：查询的几何对象，可通过绘制工具获得

		var params = new IdentifyParameters();
		params.returnGeometry = true;
		params.layerIds = [0, 1, 2];
		params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
		params.geometry - geometry;

查询的返回结果：返回的是一个IdentifyResults数组，IdentifyResults[i].feature可以加入到GraphicsLayer上显示，也可以通过Attributes属性字段得到属性信息。

### 利用IdentifyTask实现空间查询 ###

	function identifyQuery(geometry) {
	    //定义空间查询对象，注意他的参数是整个地图服务，而不是单个图层
	    var identifyTask = new IdentifyTask(MapServer);
	    //定义空间查询参数对象
	    var params = new IdentifyParameters();
	    //容差
	    params.tolerance = 5;
	    //是否返回几何信息
	    params.returnGeometry = true;
	    //空间查询的图层，此时是两个图层
	    params.layerIds = [1,3];
	    //空间查询的条件
	    params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
	    params.width = map.width;
	    params.height = map.height;
	    //空间查询的几何对象
	    params.geometry = geometry;
	    params.mapExtent = map.extent;
	    //执行空间查询
	    identifyTask.execute(params,showQueryResult);
	}


参考：

- [https://www.cnblogs.com/luxiaoxun/p/3297654.html](https://www.cnblogs.com/luxiaoxun/p/3297654.html)
- [https://blog.csdn.net/lovecarpenter/article/details/52669777](https://blog.csdn.net/lovecarpenter/article/details/52669777)
