# ArcGIS API for JavaScript以JSON参数构建地图渲染 #
## 无边框的SimpleMarkerSymbol ##

	{
		"color": [255, 0, 0, 128],
		"size": 12,
		"type": "esriSMS",
		"style": "esriSMSCircle | esriSMSCross | esriSMSDiamond | esriSMSSquare | esriSMSX | esriSMSTriangle"
	}

## 有边框的SimpleMarkerSymbol ##

	{
		"color": [255, 0, 0, 128],
		"size": 12,
		"type": "esriSMS",
		"style": "esriSMSCircle",
		"outline": {
			"color": [255, 0, 0, 125],
			"width": 1,
			"type": "esriSLS",
			"style": "esriSLSSolid"
		}
	}

## PictureMarkerSymbol ##

	{
		"url": "<imageUrl>",
		"imageData": "<base64EncodeImageData>",
		"contentType": "<imageContentType>",
		"height": <height>,
		"width": <width>,
		"angle": <angle>,
		"xoffset": <xoffset>,
		"yoffset": <yoffset>,
		"type": "esriPMS"
	}

## SimpleLineSymbol ##
 	
	{
		"type": "esriSLS",
		"style": "<esriSLSDash | esriSLSDashDot | esriSLSDashDotDot | esriSLSDot | esriSLSNull | esriSLSSolid>",
		"color": <color>,
		"width": <width>
	}

## SimpleFillSymbol ##

	{
		"type": "esriSFS",
		"style": "<esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertical>",
		"color": <color>,
		"outline": <simpleLineSymbol>
	}

参考：

- [https://wenku.baidu.com/view/12a0ff8d85868762caaedd3383c4bb4cf7ecb78e.html](https://wenku.baidu.com/view/12a0ff8d85868762caaedd3383c4bb4cf7ecb78e.html)
- [https://www.jianshu.com/p/267a95f40c58](https://www.jianshu.com/p/267a95f40c58)