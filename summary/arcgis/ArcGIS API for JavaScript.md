# ArcGIS API for JavaScript #
通过ArcGIS API for JavaScript可以对ArcGIS for Server进行访问，并且将ArcGIS for Server提供的地图资源和其他资源（ArcGIS Online）嵌入到Web应用中。

## ArcGIS API for JavaSript主要特点 ##
1. 空间数据展示：加载地图服务，影像服务，WMS等。
2. 客户端Mashup：将来自不同服务器、不同类型的服务在客户端聚合后统一呈现给客户。
3. 图形绘制：在地图上交互式地绘制查询范围或地理标记等。
4. 符号渲染：提供对图形进行符号化，要素图层生成专题图和服务端渲染等功能。
5. 查询检索：基于属性和空间位置进行查询，支持关联查询，对查询结果的排序、分组以及对属性数据的统计。
6. 地理处理：调用ArcGIS for Server发布的地理处理服务（GP服务），执行空间分析、地理处理或其他需要服务器端执行的工具、模型、运算等。
7. 网络分析：计算最优路径、临近设施和服务区域。
8. 在线编辑：通过要素服务编辑要素的图形、属性、附件，进行编辑追踪。
9. 时态感知：展示、查询具有时间特征的地图服务或影像服务数据。
10. 影像处理：提供动态镶嵌、实时栅格函数等处理等功能。
11. 地图输出：提供多种地图图片导出和服务器端打印等功能。

在使用ArcGIS API for JavaScript的时候，其实就是在使用这些REST API使用这些服务对外的能力，了解每种服务的具体功能，在开发的时候就可以根据需求做到游刃有余。

## 集成开发环境和API的准备 ##
要引入ArcGIS API for JavaScript的开发包

下载链接：

[https://developers.arcgis.com/downloads/apis-and-sdks?product=javascript](https://developers.arcgis.com/downloads/apis-and-sdks?product=javascript)

注册账号：

[https://accounts.esri.com/en/signup?redirect_uri=http%3A%2F%2Fappsforms.esri.com%2Fproducts%2Fdownload%2Findex.cfm%3Ffuseaction%3Ddownload.all](https://accounts.esri.com/en/signup?redirect_uri=http%3A%2F%2Fappsforms.esri.com%2Fproducts%2Fdownload%2Findex.cfm%3Ffuseaction%3Ddownload.all)

### 修改API的两个JS文件 ###

1. D:\software\arcgis_js_v48\arcgis_js_v48_api\arcgis_js_api\library\4.8\init.js
	
	将`https://[HOSTNAME_AND_PATH_TO_JSAPI]dojo`修改成`http://localhost/arcgis_js_api/library/4.8/dojo`

	![](https://i.imgur.com/34gjh2a.png)
2. D:\software\arcgis_js_v48\arcgis_js_v48_api\arcgis_js_api\library\4.8\dojo\dojo.js

	将`https://[HOSTNAME_AND_PATH_TO_JSAPI]dojo`修改成`http://localhost/arcgis_js_api/library/4.8/dojo`

	![](https://i.imgur.com/UZ8MSZm.png)


----------


### IIS部署 ###
打开控制面板，点击【程序】→【启用或关闭Windows功能】，然后找到Internet信息服务，然后进行勾选。

![](https://i.imgur.com/XAjhmHY.png)

FTP服务器和Web管理器全选和万维网服务中的安全性、常见HTTP功能。性能功能全选。应用程序开发功能和运行状况和诊断按下图选

![](https://i.imgur.com/Am3Td5I.png) ![](https://i.imgur.com/YSpUcEA.png)

### 打开IIS管理器 ###
打开控制面板，点击【系统与安全】→【管理工具】→【Internet信息服务（IIS）管理器】，打开IIS管理器

![](https://i.imgur.com/4gyDLUI.png)

### 配置IIS管理器 ###
在硬盘的某一位置新建一个Web站点文件夹（我建在了D:\\Web）

设置后的显示：

![](https://i.imgur.com/UQJm5X1.png)

输入网址

![](https://i.imgur.com/7dTTi1o.png)

如果不行的话应该是没打开目录浏览，进去之后右边有一个启用的按钮。

![](https://i.imgur.com/ynHDqOy.png)

输入`http://localhost/arcgisjssdk/sdk/index.html`可看到：

![](https://i.imgur.com/AxnE7ie.png)


----------
### Tomcat部署 ###
将arcgis_js_api放在webapps下，同样修改两个js文件

修改后图片：

dojo.js修改：

![](https://i.imgur.com/EnfkBKB.png)

init.js修改

![](https://i.imgur.com/AzLthZ4.png)




## 一些专业名词 ##
- OGC：开放地理空间信息联盟（Open Geospatial Consortium-OGC），致力于提供地理信息行业软件和数据及服务的标准化工作。OGC定义了三种地理参考信息模型：
	- WMS
	- WFS
	- WCS
- WMS：Web地图服务能够根据用户的请求返回相应的地图（包括PNG，GIF，JPEG等栅格形式或者是SVG和WEB CGM等矢量形式）
- WFS：Web要素服务支持对地理要素的插入，更新，删除，检索和发现服务。该服务提供HTTP客户请求返回DML数据
- WCS：Web地理覆盖服务提供的是包含了地理位置信息或属性的空间栅格图层，而不是静态地图的访问。根据HTTP客户端要求发送相应数据，包括影像，多光谱影像和其他科学数据。
- KML：基于XML的标记语言，利用XML语法格式描述地理空间数据（如点、线、面、多边形和模型等），适合网络环境下的地理信息协作与共享。由OGC维护和发展。


## 基础入门 ##
### 地图 ###
Map 是承载图层的容器，主要用于呈现地图服务、影像服务，此外还可以展示 WMS 服务等，一个图层只有被添加到 Map 中，才能被显示出来。

Map类包含储存、管理和覆盖2D3D视图共有图层的属性和方法。

>basemap为加载的底图，可选值为：streets、satellite、hybrid、topo、gray、dark-gray、oceans、osm、national-geographic
>
>ground指定地图的表面属性，字符串"world-elevation"使用世界高程服务指定地面的一个实例。

### 图层 ###
图层是承载服务的载体（GraphicsLayer 除外），ArcGIS for Server 将 GIS 资源作为服务发布出来，要
想在浏览器端看到这些服务，就必须将这些服务和图层关联起来，不同的服务对应不同的图层类型。

### Geometry ###
几何对象用于标识对象的显示形式，在 ArcGIS API for JavaScript 中 Geometry 大体上可以分为下面几
类：点、多点、线、矩形、多边和 ScreenPoint。

- Geometry：抽象类，定义几何体的图形。
- MapPoint：点对象。
- MultiPoint：多点对象。
- Polyline：多义线对象，由路径（Path）组合而成。
- Envelope：矩形对象，长宽方向分别平行于X、Y轴。
- Polygon：多边形对象，由环（Ring）组合而成。
- ScreenPoint：用像素来表示点的X、Y坐标，相对于屏幕的左上角。

### Symbol ###
Symbol定义了如何在GraphicLayer上显示点，线，面和文本，符号定义类几何对象的所有非地理特征方面的外观，包括图形的颜色，边框线宽度，透明度等等。ArcGIS API for JavaScript 包含了很多符号类，
每个类都允许你使用唯一的方式制定一种符号。每种符号都特定于一种类型（点、线，面和文本）。

### Graphic ###
Geometry定义了对象的形状，Symbol定义了图形是如何显示的，Graphic可以包含一些属性信息，并且在JavaScript中还可以使用info Template（一个InfoTemplate包含标题和内容模板字符串，该内容模板字符串用于将Graphic的属性转换成HTML的表达式）定义如何对属性信息进行显示，最终的Graphic则是被添加到GraphicsLayer中，GraphicsLayer允许对Graphics进行事件监听，对于Graphic的描述可以用一个数学表达式来表示：

	Graphic=Geometry+Attribute+Symbol+info Template

### Render ###

---

## basemap ##
底图图层属于一类地图图层，提供了一个可显示动态操作信息的框架。底图显示性能非常强大。由于底图图层相对稳定，不常发生变化，因此其显示只需计算一次，然后便可以多次重复使用。首次以特定的地图比例访问某个区域时，会对地图图层的显示进行计算。以后再以此地图比例访问该区域时，可调出显示。底图用于位置参考，并为用户提供叠加或聚合业务图层、执行任务以及可视化地理信息的框架。底图是执行所有后续操作和地图制图的基础，它为地理信息的使用提供了环境和框架。

## center ##
center：视图的中心点

## container ##
container：装载这个视图的容器

## map ##
map：视图渲染的Map对象的实例。

## scale ##
scale：视图中的地图比例尺

## zoom ##
zoom：视图中缩放比例。


参考链接：

- [OGC、WMS、WFS、WCS](https://blog.csdn.net/hi_kevin/article/details/34445911)
- [【一】ArcGIS API for JavaScript之API的使用和部署](https://blog.csdn.net/yy284872497/article/details/78878435)
- [Win10下Arcgis api for javascript的本地服务器（IIS）配置](https://blog.csdn.net/qq_36305327/article/details/56008464)
- [arcgis api for js 3.25](https://developers.arcgis.com/javascript/3/jsapi/)

