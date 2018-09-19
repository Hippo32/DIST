# dojo/on #
## 使用 ##
	require(["dojo/on"], function(on) {
		on(target, "event", function(e) {
			// handle the event
		});
	});

## 移除 ##
	require(["dojo/on", "dojo/_base/window"], function(on, win) {
		var signal = on(win.doc, "click", function() {
			signal.remove();
		});
	});

## emit() ##
`emit()`用于触发事件