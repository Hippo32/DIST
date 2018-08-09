define([
    "dojo/_base/declare",
    "dojo/_base/fx",
    "dojo/_base/lang",
    "dojo/dom-style",
    "dojo/mouse",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/AuthorWidget.html"
], function(declare, baseFx, lang, domStyle, mouse, on, _WidgetBase, _TemplatedMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin], {
        // 设置一些默认值
        name: "No Name",
        avator: require.toUrl("./images/defaultAvatar.jpg"),
        bio: "",

        // 加载我们的模板 - important！
        templateString: template,

        // 将会被应用到模板根节点的css类名
        baseClass: "authorWidget",

        // 指向我们背景动画对象的引用
        mouseAnim: null,

        // 用于背景的颜色属性
        baseBackgroundColor: "#fff",
        mouseBackgroundColor: "#def",

        postCreate: function() {
            var domNode = this.domNode;

            this.inherited(arguments);

            domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);
            this.own(
                on(domNode, mouse.enter, lang.hitch(this, "_changeBackground", this.mouseBackgroundColor)),
                on(domNode, mouse.leave, lang.hitch(this, "_changeBackground", this.baseBackgroundColor))
            );
        },

        _changeBackground: function(newColor) {
            if(this.mouseAnim) {
                this.mouseAnim.stop();
            }
            this.mouseAnim = baseFx.animateProperty({
                node: this.domNode,
                properties: {
                    backgroundColor: newColor
                },
                onEnd: lang.hitch(this, function() {
                    this.mouseAnim = null;
                })
            }).play();
        },

        // 做一个安全检查，在用户传入空字符串时，就使用默认的头像。
        _setAvatarAttr: function(imagePath) {
            if(imagePath != "") {
                this._set("avatar", imagePath);
                this.avatarNode.src = imagePath;
            }
        }
    });
});