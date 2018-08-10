define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/date/locale",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom-style",
    "dijit/Calendar",
    "dijit/form/Button",
    "dojo/on",
    "dojo/date",
    "dojo/_base/lang",
    "dojo/_base/connect",
    "dojo/text!./templates/calendar.html"
], function(declare, domConstruct, locale, _WidgetBase, _TemplatedMixin, domStyle, Calendar,
        Button, on, dojoDate, lang, connect, template) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        selectedDate: null,
        calendarInstance: null,
        bookingWindowMaxDate: null,
        bookingWindowMinDate: null,
        onValueSelectedPublishIDString: null,
        currentFocusDate: null,
        calendarFollowingMonthButton: null,
        calendarPreviousMonthButton: null,

        // 修改构造函数以复制从控制器传来的变量
        constructor: function(args) {
            if(args) {
                lang.mixin(this, args);
            }
        },

        //使用dojo/date/locale，所有日期都以具有en-us短格式mm/dd/yyyy的字符串传递
        postCreate: function() {
            this.inherited(arguments);
            this.bookingWindowMinDate = locale.parse(this.bookingWindowMinDate, {formatLength: 'short', selector: 'date', locale: 'en-us'});
            this.currentFocusDate = this.selectedDate = locale.parse(this.selectedDate, {formatLength: 'short', selector: 'date', locale: 'en-us'});
            this.bookingWindowMaxDate = locale.parse(this.bookingWindowMaxDate, { formatLength: 'short', selector: 'date', locale: 'en-us'});
            this.calendarInstance = this.createCalendar(this.selectedDate, this.calendarMonthOneAttachPoint);
            // 禁用Calendar页眉中的下拉按钮
            this.calendarInstance.monthWidget.set("disabled", true);
            // 创建dijit/form/buttom的一个实例
            this.calendarPreviousMonthButton = new Button({
                label: "<<",
                onClick: lang.hitch(this, function() {
                    this.goToPreviousMonth(this.calendarInstance);
                })
            }, this.calendarPreviousMouthButtonAP);

            this.calendarFollowingMonthButton = new Button({
                label: ">>",
                onClick: lang.hitch(this, function() {
                    this.goToNextMonth(this.calendarInstance);
                })
            }, this.calendarFollowingMonthButtonAP);

            if(this.isLastCalendarMonth(this.bookingWindowMaxDate, this.currentFocusDate)){
                calendarFollowingMonthButton.set("disabled", true);
            }
            if(this.isLastCalendarMonth(this.bookingWindowMinDate, this.currentFocusDate)){
                calendarPreviousMonthButton.set("disabled", true);
            }
        },
        createCalendar: function(selectedDate, calendarAttachPoint) {
            var parent = this;
            return new Calendar({
                value: selectedDate,
                currentFocus: selectedDate,
                // isDisabledDate函数用于禁用日历中的某些日期。如果函数返回true，那么将会禁用该日期。
                // 每次日历刷新时，都会调用此函数，并且会将日历中的每一天的日期传送给它。
                isDisabledDate: function(date) {
                    if(dojoDate.difference(parent.currentFocusDate, date, "month") !== 0) {
                        return true;
                    }
                    if(dojoDate.difference(parent.bookingWindowMinDate, date, "day") < 0 ||
                        dojoDate.difference(parent.bookingWindowMaxDate, date, "day") > 0) {
                            return true;
                        }
                    else {
                        return false;
                    }
                },
                // 使用getClassForDate函数返回一个CSS类名，在日历上以不同形式标记该日期
                // 对于自定义小部件，需要突出显示selectedDate，向该日期添加一个具有黑色边界的蓝色框
                // 你还需要使用灰色突出显示在最小和最大日期边界之外的日期，隐藏不属于当月的日期。
                getClassForDate: function(date) {
                    if(dojoDate.compare(date, selectedDate, "date") === 0) {
                        return "Avaliable";
                    } // apply special style
                    if(dojoDate.difference(parent.currentFocusDate, date, "month") !== 0) {
                        return "HiddenDay";
                    }
                    if(dojoDate.difference(parent.bookingWindowMinDate, date, "day") < 0 ||
                        dojoDate.difference(parent.bookingWindowMaxDate, date, "day") > 0) {
                            return "Disabled"
                        }
                },

                // 此函数仅在为日历设置一个新值或在日历上选择一个启用值时调用。此函数返回所选日期的一个日期对象。
                // 你可以使用该对象将日期发布到另一个将处理该日期的方法。调用你的自定义小部件中定义的一个函数(onValueSelected)
                // 在发布到控制器之前，你可以在其中执行任何需要的处理。
                // 使用diji/_base/lang/hitch来提供调用函数onValueSelected的范围。
                onChange: lang.hitch(this, function(date) {
                    this.onValueSelected(date);
                })
            },
                domConstruct.create("div", {}, calendarAttachPoint));
        },

        
        goToPreviousMonth: function(calendarInstance) {
            // 日历视图减去一个月
            this.currentFocusDate = dojoDate.add(this.currentFocusDate, "month", -1);
            calendarInstance.set("currentFocus", this.currentFocusDate); // 设置日历的新视图，这将自动刷新日历并显示新视图
            // 检查这是否是最后一个月的视图，方法是对比currentFocusDate与最小值边界；如果是最后一个月，则禁用后退按钮。
            if(this.isLastCalendarMonth(this.bookingWindowMinDate, this.currentFocusDate)) {
                this.calendarPreviousMonthButton.set("disabled", true);
            }
            // 另外，请检查你是否应用了前进按钮（加入你禁用了该按钮，并且闲杂你离开了最大值边界）
            if(!this.isLastCalendarMonth(this.bookingWindowMaxDate, this.currentFocusDate)){
                this.calendarFollowingMonthButton.set("disabled", false);
            }
        },

        goToNextMonth: function(calendarInstance) {
            this.currentFocusDate = dojoDate.add(this.currentFocusDate, "month", 1);
            calendarInstance.set("currentFocus", this.currentFocusDate);
            if(this.isLastCalendarMonth(this.bookingWindowMaxDate, this.currentFocusDate)) {
                this.calendarFollowingMonthButton.set("disabled", true);
            }
            if(!this.isLastCalendarMonth(this.bookingWindowMinDate, this.currentFocusDate)) {
                this.calendarPreviousMonthButton.set("disabled", false);
            }
        },

        isLastCalendarMonth: function(limitDate, testDate) {
            if(limitDate.getFullYear() - testDate.getFullYear() === 0) {
                if(limitDate.getMonth() - testDate.getMonth() === 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        },

        onValueSelected: function(date) {
            connect.publish(this.onValueSelectedPublishIDString, [date]);
        }
    })
})