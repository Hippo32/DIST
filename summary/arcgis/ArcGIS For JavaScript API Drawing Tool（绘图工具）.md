# ArcGIS For JavaScript API Drawing Tool（绘图工具） #
ersi.toolbars.Draw(map, options) 绘制一个新的绘图对象，地图是必要的参数。

绘图工具支持点线面的绘制，其中点（点或多点）、线（线、折线或徒手画的多段线）、多边形（徒手多边形或多边形），或矩形（Extent）。使用绘画工具的时候常常伴随着鼠标的操作。鼠标行为当绘图功能，对于不同的几何对象，鼠标的操作也有所不同：

- 点：点击添加一个点。
- 多点：点击添加点，双击添加最后一个点的多点。
- 对多线和多边形：点击添加顶点，双击添加最后一个顶点。
- 对徒手折线和徒手画的多边形，从按下鼠标开始绘制，到释放鼠标画完。

种类：

- Point(点)
- Multipoint(多点)
- Line(线)
- Polyline(折线)
- Polygon(多边形)
- Freehand Polyline(手绘折线)
- Freehand Polygon(手绘多边形)
- Arrow(箭头)
- Triangle(三角形)
- Circle(圆形)
- Ellipse(椭圆)

STYLE_CIRCLE(●),STYLE_CROSS(+),STYLE_DIAMOND(◆),STYLE_SQUARE(■),STYLE_X(X)

STYLE_DASH(破折号),STYLE_DASHDOT(点划线),STYLE_DASHDOTDOT,STYLE_DOT(点),STYLE_NULL,STYLE_SOLID(实线)


给button绑定事件（激活绘图工具）

	// 定义一个绘图工具
	var toolBar = new Draw(map);
	// 给button绑定事件
	on(dom.byId("Btn"), "click", function() {
		// 激活绘图工具，我要绘制一个面图形
		toolBar.activate(Draw.POLYGON);
	})

给绘图工具绑定绘图完成事件，绘图完成执行`queryGraphic`函数，并将绘制的geometry传入函数

	on(toolBar, "draw-complete", function(result) {
		// 获得绘图得到的面
		var geometry = result.geometry;
		// 关闭绘图工具
		toolBar.deactivate();
		queryGraphic(geometry);
	});

## 绘图工具的主要方法 ##
构造方法：`esri.toolbars.Draw(map, options?)`

构造方法在创建绘图对象时候需要传地图对象，以及一些可选参数，以下几个为常用的可选参数：

- drawTime：在使用徒手工具的时候，多长时间可以添加下一个点
- showTooltips：是否显示提示
- tolerance：使用徒手工具的时候设置添加下一个点的容差
- tooltipOffset：设置ToolTip的偏差位置

方法：

- activate：激活绘制图形的类型，点，线面等
- deactivate：取消激活的绘制工具
- finishDrawing：绘制结束并导致onDrawEnd事件发生
- setFillSymbol：设置面的符号
- setLineSymbol：设置线的符号
- setMarkerSymbol：设置点的符号
- setRespectDrawingVertexOrder：设置是否面被修改以保证拓扑正确

属性：

- fillSymbol：获取或者设置面或者Extent的符号
- lineSymbol：获取或者设置绘制线条的符号
- markerSymbol：获取或者设置绘制点或者多点的符号
- respectDrawingVertexOrder：是否设置绘制的图形拓扑正确

事件：

- draw-complete：用户完成绘图时触发。它返回绘制要素的几何图形和要素的地理坐标。
- draw-end：此事件已弃用。请draw-complete改用。绘图结束时触发。

		require([
			"esri/toolbars/draw",
			"esri/graphic",...
		], function(Draw, Graphic, ...) {
			function createToolbar(map) {
				var toolbar = new Draw(map);
				toolbar.on("draw-end", addToMap);
			}
			function addToMap(evt) {
				var graphic = new Graphic(evt.geometry, symbol);
				map.graphics.add(graphic);
			}
			...
		});


参考：

- [https://blog.csdn.net/xiaokui_wingfly/article/details/8492151](https://blog.csdn.net/xiaokui_wingfly/article/details/8492151)
- [http://www.ibloger.net/category-37.html](http://www.ibloger.net/category-37.html)
- [https://developers.arcgis.com/javascript/3/samples/toolbar_draw/index.html](https://developers.arcgis.com/javascript/3/samples/toolbar_draw/index.html)