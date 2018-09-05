# ArcGIS For JavaScript API Drawing Tool（绘图工具） #
ersi.toolbars.Draw(map, options) 绘制一个新的绘图对象，地图是必要的参数。

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


参考：

- [https://blog.csdn.net/xiaokui_wingfly/article/details/8492151](https://blog.csdn.net/xiaokui_wingfly/article/details/8492151)
- [http://www.ibloger.net/category-37.html](http://www.ibloger.net/category-37.html)
- [https://developers.arcgis.com/javascript/3/samples/toolbar_draw/index.html](https://developers.arcgis.com/javascript/3/samples/toolbar_draw/index.html)