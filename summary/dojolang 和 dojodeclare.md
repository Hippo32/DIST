# dojo/_base中的lang和declare #
2018/7/26 9:09:17 

## dojo/store ##
用于访问和操作存储的数据。

## dojo/_base/lang ##
### lang.mixin(dest,sources...) ###
将所有的source中的属性拷贝到dest中，并返回dest。

因为dest与source都是对象，而遍历对象中所有的属性可以使用for-in。所以mixin的原理 就是利用for-in将source中的所有属性拷贝到dest中，如果某个属性指向对象，我们只做浅拷贝。

与mixin相关的还有`lang.extend(ctor, props)`这个函数。mixin的目的是从一个对象向另一个对象复制属性，而extend的目的是将属性复制到一个类的原型中。其主要的原理也是利用mixin：`mixin(ctor.prototype, props)`

### lang.getObject(prop, create, obj) ###
如果要取一个对象中很深的一个属性值，它能避免编写繁冗的属性层级判断。

### lang.setObject(name, value, context) ###
name是属性串（如a.b.c)，setObject的实现也要利用getPro，先取至倒数第二层的属性，然后为最后一层赋值。

### lang.exists(name, obj) ###
主要用来判断一个对象中是否存在某个属性。它仅仅以undefined来做判断，如果属性为null，这个函数仍然返回true

### lang.hitch(scope, method) ###
目的是改变函数中this关键字的指向，它相当于bind函数，这个函数也是每个程序都要用到的
 
bind()函数：bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

### lang.partial ###
用lang.partial，你可以创建一个新的预先设置好参数值的函数。

### lang.delegate(obj) ###
顾名思义为一个对象做代理，该函数的作用跟Object.create函数在本质上是相同的。

代理对象在一定程度上保护原对象不被修改，而且代理比克隆的速度快。

如果对象中的属性都是基本类型，建议使用代理函数来代替克隆，否则的话还是老老实实的用克隆吧。

### lang.clone(/*anything*/ src) ###
克隆函数，可以克隆任何变量

### lang.trim ###
去除字符串头尾的空白字符

### lang.replace ###
替换字符串

## dojo/_base/declare ##
整个declare.js一共定义了15个函数，14个具名函数，1个匿名函数，14个具名函数中又有一些是declare.js内部使用的函数，外部无法调用，还有一些是由dojo提供的接口，可以供dojo.declare声明的类型来调用。

5个对外提供的接口：

- inherited()
- getInherited()
- isInstanceOf()
- createSubclass()
- safeMixin()
### 使用Dojo创建Dojo基本类 ###
`declare`接受三个参数：

- `className`：表示类的名称，包括要创建的命名空间。命名类放在全局范围内。该`className`也可以代表通过命名空间中的继承链
	- 命名类：全局范围可用
	- “匿名”类：只在给定范围内用
- `superClass`：可以是`null`，一个现有类，也可以是现有类的数组。如果一个新类继承自多个类，则列表中的第一个类将是基本原型，其余类将被视为“mixins”
	- 没有继承的类
		
			var MyClass = declare(null, {
				//...
			}
	- 继承自另一个类的类：可以通过在第三个参数中添加带有新定义的键来覆盖父类的方法或属性。
	- 具有多重继承的类：类数组表示多重继承。属性和方法从左到右继承。数组中的第一个类充当基本原型，然后后续类是该类的mixins。
- `properties`：属性和方法对象。最后一个参数是一个包含类原型的方法和属性的对象。

例子：

    require(['dojo/_base/declare'], function(declare) {
        declare("ClassX", null, {
            messageX: null,
            constructor: function(msgX) {
                this.messageX = msgX;
            },
            sayMessageX: function() {
                console.log("hi, this is " + this.messageX);
            }
        });
    })
    var objX = new ClassX("X");
    objX.sayMessageX();
    console.log(objX);

构造函数的prototype的解析：

- declaredClass：函数名，即传给dojo.declare的第一个函数
- _constructor：类的初始化函数，即props中的constructor函数 ，当创建一个新对象时，由dojo.clare生成的构造函数自动调用此函数初始化所有的实例属性。
- constructor：由dojo.clare为类生成的构造函数。
- inherited：运用此方法可以调用父类的同名函数。
- props中定义的所有属性及方法，此处包括messageX和sayMessageX。
- 由于ClassX没有父类，则其`__proto__`执行根原型。

![](https://i.imgur.com/AZPvAH8.png)

### 使用`constructor`深入挖掘Dojo的类创建 ###
`constructor`方法在类实例化时触发，在新对象的范围内执行。这意味着`this`引用实例，而不是原始类。

可以在constructor中使用`lang.mixin()`

如果您的类包含数组或其他对象则应在`constructor()`中声明它们，以便每个实例都获得自己的副本。

### 继承Inheritance ###
继承关系是通过declare的第二个参数定义的。如果某个属性或方法已存在，则子类或按照父类参数，从左至右进行替换混入。

原型继承：当检索一个对象实例的属性时，会首先检查实例自己定义的属性。如果没有，会查找原型链，如果原型链中的第一个对象有定义该属性，直接返回。如果给实例对象的某个属性（可能是继承来的）赋值（基础数据类型，例如：number，string，boolean等），则该值只会保存在实例对象上，而非原型上。但是，如果你给原型的某个属性赋的是个object values（Object，Array），那么所有实例对象访问的就是同一个共享值了。

为了避免不小心在实例间共享了数组或对象，对象属性一般赋为null，然后在构造函数中初始化。（注：构造函数实在实例对象的空间中运行了，因此他赋的值只对该实例对象有效）。

### this.inherited ###
this.inherited(arguments)语句调用父类的同名方法。

注意：不要在constructor中调用this.inherited

### 多重继承 ###
多重继承传递的第一个类才是真正的超类。其余的是mixins，并混合到子类中以生成我们需要的继承链。`instanceof`操作符不能用于mixins，仅用于基类。可以用`isInstanceOf()`代替

### safeMinxin() ###
这是dojo/declare里面定义的一个接口方法，专门用于在已有类中加入额外的方法。它的功能和lang.mixin 相同，但是它除了做方法或者属性的合并外，还能保证并入的方法与 declare 定义的类的兼容。

在任何函数上它都添加了一个属性：`nom`，该值是函数属性的名称。这个方式`this.inherited()`和`this.getInherited()`知道调用什么超类方法。如果此属性不存在，则必须将名称指定为`this.inherited()`或`this.getInherited()`中的第一个参数。

### 共同惯例 ###
- `declare()`在新开发中省略了类名（第一个参数）。
- AMD模块ID（MID）称为通常引用的类名。此名称隐含在文件路径中。
- 可以实例化的类以驼峰式格式命名。
- 不希望有最终开发人员直接实例化的“私有”类和mixin以下划线（`_`）开头。
- 即时的类与模块有1对1的关系，应该构成`define()`回调的返回值。
- 私有且不需要在模块外部实例化的类应该在模块中声明为变量。

### 链接 ###
链接跟`this.inherited()`比的优点：

- 它比使用`this.inherited()`快得多。
- 这是自动的。
- 编写的代码少。

链接方法有两种方式：`after`和`before`。`after`表示在超类方法之后调用方法。`before`表示在调用其超类方法之前调用方法。所有链接都在一个名为`-chain-`的特殊属性中描述。

	var A = declare(null, {
		"-chains-": {
			init: "after",
			destroy: "before"
		}
链声明是继承的。可以在子类中覆盖单个方法的链接。

### 构造函数 ###
构造函数参数：默认情况下，dojo.declare在多继承下会按序先将参数传递给父类的构造函数，然后传递给聚合类（即mixin）的构造函数，最后传递给子类的构造函数。

this关键字是指向对象实例，而非类。constructor方法可以接受任意长度参数，用于实例初始化。

所有的构造函数都使用`after`算法链接。

手动构造函数

	constructor: "manual"

### extend() ###
该方法有一个参数，一个要混合的对象。它返回构造函数本身，可以用于链式调用。

在内部，此方法使用safeMixin()

### createSubclass() ###
此构造方法使用基类列表创建构造函数类的子类。

该方法有两个参数，第一个是要扩展的基类数组，第二个是要混合到新创建的类中的对象。它返回新创建的子类的构造函数。

### inherited() ###
用于调用超类方法。最多接受三个参数：

- 要调用的方法的可选名称
- arguments
- 可选的参数数组，用于调用超类方法。

它返回被调用的超类方法返回的任何值。如果事实证明没有超类方法可以调用，则`inherited()`不会执行任何操作并返回`undefined`

### getInherited() ###
这是inherited()的伴随方法。不同之处在于它不执行找到的方法，而是返回它。用户可以使用适当的参数调用它。

该方法最多接受连个参数：

- 要调用的方法的可选名称。
- arguments

结果是超类方法，或者undefined。

### isInstanceOf() ###
此方法检查实例是否派生自给定的类。

该方法接受一个参数：class(constructor)。它返回true/false

### 使用原始类 ###
dejo/declare()允许使用由其他方法创建的“原始”类作为超类。他猛不能使用`inherited()`，但是他们的方法将由`inherited()`调用，并且所有方法都可以链接，包括构造函数。

### 元信息 ###
`meta`具有以下属性：

- bases：由C3线性化算法生成的所有超类的列表。列表中的第一项是类本身。
- hidden：复制所有自己的属性和类的方法。它是第三个参数（或第二个参数，如果省略了类名）
- chains：链接列表由所有继承的链增加
- parents：直系亲属名单。它是第二个参数（或第一个参数，如果省略了类名）



参考文章：

- [https://blog.csdn.net/taijiedi13/article/details/53455495](https://blog.csdn.net/taijiedi13/article/details/53455495)