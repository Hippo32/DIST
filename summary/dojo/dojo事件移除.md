# dojo移除事件 #
## 对象.remove ##

	require(["dojo/on", "dojo/_base/window"], function(on, win) {
		var signal = on(win.doc, "click", function() {
			// remove listener after first event
			signal.remove();
			// do something else...
		});
	});

## 取消订阅主题 ##
`dojo.unsubscribe`

## dojo.disconnect(handler) ##
