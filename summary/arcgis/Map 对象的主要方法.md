# arcgis api for js 之地图对象 #
`Map` 对象是 ArcGIS API for JavaScript 的核心对象，其它控件或多或少的都将 `Map` 对象作为其参数，它主要用于呈现地图服务、影像服务等。一个地图对象需要通过一个 DIV 元素才可以添加到页面中，通常地图控件的宽度和高度是通过 DIV 容器初始化的。`Map` 对象不仅仅用来承载地图服务和 GraphicsLayer 同时还可以监听用户在地图上的各种操作事件，并做出响应，Map 对象提供了非常丰富的事件，使用这些事件，就可以让地图跟用户随心所欲的去交互。

## Map 对象的主要方法 ##
	构造方法：esri.Map(divId, options)
构造方法在创建一个 map 对象必须传入一个 div 元素作为其容器，此外这个构造方法还包括一系列可选的
参数用来描述地图的相关行为，下面三个为常用的可选参数：

|-|-|
|extent|如果设置了该选项，一旦这个选项的投影被设置，那么所有的图层都在定义的投影中绘制。|
|logo|是否显示 esri 的 logo|
|wrapAround180|是否连续移动地图，即通过日期变更线，好似对地图进行横向旋转 360 度.|
|lods|设置地图的初始比例级别|
|maxScale|设置地图的最大可视比例尺|
|sliderStyle|设置 slider 的样式，值为 large 或者 small。|

|-|-|
|方法|说明|
|toScreen/toMap|地图不屏幕之间的坐标转换。|
|setScale|设置地图到指定的比例尺|
|setZoom|放缩到指定的层级|
|setLevel|放缩到指定的层级|
|setExtend|设置地图显示范围，常用于进行地图的平移操作|
|disablePan|禁止使用鼠标平移地图|
|removeAllLayers|移除所有图层|
|addLayer(layer,index?)|添加图层|
|getBasemap|获取底图|
|getLayer(id)|根据 id 获取图层|
|getLayersVisibleAtScaleRange|获取某一比例尺下的可见图层（图层数组）|
|getScale|获取当前的比例尺|
|hidePanArrows|隐藏移动时候的鼠标箭头|
|hideZoomSlider|隐藏放大滑块|
|panRight|向右平移|
|panUp|向北平移|
|removeAllLayers|移除所有图层|
|removeLayer|移除指定图层|
|reorderLayer|改变图层的顺序|
|reposition|复位地图，该方法在地图的 DIV 被复位的时候要用到|
|setTimeExtent|设置地图的时间范围|
|setTimeSlider|设置和地图关联的时间滑块|
|setZoom|设置放大级别|
|showPanArrows|显示平移箭头|
|showZoomSlider|显示放大滑块|