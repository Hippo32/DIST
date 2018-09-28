# JavaScript中的对象拷贝 #
## 浅拷贝 ##
浅拷贝得到的是对象的引用，而不是一个新地址，改变新值会影响到旧的值。

### 方法一 ###
简单的赋值语句

### 方法二 ###
`Object.assign()`方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。（IE不支持）

语法

> Object.assign(target, ...sources)

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后来的源对象的属性将类似地覆盖前面的属性。

`Object.assign()`拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。

注意，`Object.assign`不会跳过那些值为`null`或`undefined`的源对象。

	// 复制一个对象
	var obj = { a: 1 };
	var copy = Object.assign({}, obj);
	console.log(copy);

	// 合并对象
	var o1 = { a: 1 };
	var o2 = { b: 2 };
	var o3 = { c: 3 };
	var obj = Object.assign(o1, o2, o3);
	console.log(obj); //{ a: 1, b: 2, c: 3 }
	console.log(o1); //{ a: 1, b: 2, c: 3 }，注意目标对象自身也会改变

	// 合并具有相同属性的对象
	var o1 = { a: 1, b: 1, c: 1 };
	var o2 = { b: 2, c: 2 };
	var o3 = { c: 3 };
	var obj = Object.assign({}, o1, o2, o3);
	console.log(obj); // { a: 1, b: 2, c: 3 }

	// 拷贝symbol类型的属性
	var o1 = { a: 1 };
	var o2 = { [Symbol('foo')]: 2 };
	var obj = Object.assign({}, o1, o2);
	console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
	Object.getOwnPropertySymbols(obj); // [Symbol(foo)]

	// 继承属性和不可枚举属性是不能拷贝的
	// 原始类型会被包装为对象
	var v1 = "abc";
	var v2 = true;
	var v3 = 10;
	var v4 = Symbol("foo")
	var obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
	// 原始类型会被包装，null 和 undefined 会被忽略。
	// 注意，只有字符串的包装对象才可能有自身可枚举属性。
	console.log(obj); // { "0": "a", "1": "b", "2": "c" }

	// 异常会打断后续拷贝任务
	// 拷贝访问器
## 深拷贝 ##
深拷贝得到的是一个新地址，改变新值不会影响旧值。由于数据类型的不确定性，可能为对象，数组，函数，也可能是以上几种的嵌套。这个时候需要借助递归。

### 方法一 ###

1. 遍历对象 for(var prop in obj)
2. 判断是不是原始值 typeof() object
3. 判断是数组还是对象 instanceof toString constructor
4. 建立相应的数组或对象
5. 递归

		function deepClone(origin, target) {
			var target = target || {},
				toStr = Object.prototype.toString,
				arrStr = "[object Array]";
			for(var prop in origin) {
				if(origin.hasOwnProperty(prop)) {
					if(typeof(origin[prop] !== "null" && origin[prop]) =='object') {
						target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
						deepClone(origin[prop], target[prop]);
					}else {
						target[prop] = origin[prop];
					}
				}
			}
			return target;
		}

### 方法二 ###
将对象序列化再解析回来，对象中如果有函数function则不能正确复制，这种方法能正确处理的对象只有Number，String，Boolean，Array，扁平对象，即呢些能够被json直接表示的数据结构

	var obj = {a:1, b:2};
	var newObj = JSON.parse(JSON.stringify(obj));
	newObj.a = 3;
	console.log(obj);
	console.log(newObj);

### 方法三 ###
针对数组对象的方法，用数组方法concat一个空数组

	var a = [1, 2, 3];
	var b = a;
	var c = [].concat(a);
	a.push(4);
	console.log(b);
	console.log(c);

### 方法四 ###
直接使用var newObj = Object.create(oldObj)，可以达到深拷贝的效果。