# dojo define定义模块 #
2018/8/9

在dojo中，define可以用来定义模块，这个模块可以被require引用。

## dojo中declare()与define()的区别 ##
一般来说declare()使用来声明一个类，define()用来定义一个模块，可以通过require()来引用模块，一个模块只能包含一个define()，模块需要定义在一个单独js文件中。

`define([], function(){})`方法有两个参数，一个参数以该模块所依赖的模块的数组，可以省略，即在该模块中需要用到其他模块中的某个方法。第二个参数为一个函数，用来定义该模块的功能，函数中的参数，是指向第一个参数的依赖的模块，每个参数要与模块对应起来。与require()使用时的方法时一样的。

参考链接：

- [Dojo中define和declare的结合使用](https://www.cnblogs.com/qicao/p/7595314.html)
- [dojo.declare,dojo.define,dojo.require解释](http://blog.chinaunix.net/uid-27024249-id-4023752.html)