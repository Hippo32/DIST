# JS面向对象 #
2018/8/3 

### 构造器 ###
在实例化时构造器被调用（也就是对象实例被创建时）。构造器是对象中的一个方法。在JS中函数就可以作为构造器使用，因此不需要特别地定义一个构造器方法。每个声明的函数都可以在实例化后被调用执行。

构造器常用于给对象的属性赋值或者为调用函数做准备。

## 创建对象实例的方式 ##
1. 声明一个对象的语法
2. 使用构造函数
3. 使用`create()`方法

## 函数中的原型 ##

	function doSomething() {}
	console.log(doSomething.prototype);

![](https://i.imgur.com/ORFu9wc.png)

----------


**添加一些属性到doSomething的原型上**

    function doSomething() {}
    doSomething.prototype.foo = "bar"
    console.log(doSomething.prototype)

![](https://i.imgur.com/eOUgpQM.png)


----------


**函数的实例化对象**

    function doSomething() {}
    doSomething.prototype.foo = "bar";
    var doSomeInstancing = new doSomething();
    doSomeInstancing.prop = "some value";
    console.log(doSomeInstancing);

![](https://i.imgur.com/xgFaxeg.png)

说明 `__proto__ === constructor.prototype`