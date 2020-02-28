
new Vue({
    el: '#app',
    data: function () {
        return {
            date: new Date(),
            nowYear: new Date().getFullYear(),
            nowMonth: new Date().getMonth() + 1,
            nowDay: new Date().getDate(),
            splitString: "-",
            weekDays: new Array("日", "一", "二", "三", "四", "五", "六"),
            months: new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"),
            lastDays: new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),
            checkYear: '',
            checkMonth: '',
            thisDayCount: '',//这个月有几天
            ThisWeekDayCounrt: "",//这个周有多少天
            calData: [],//真数据进行渲染页面
            resData: [{//假数据 模拟后台反过来的数据
                date: '1',
                type: [1, 2],// 0、代表异常 1、代表加班 2、出差 3、假期 4、节日;
                num: 4,//2、代表一天打两次卡 4、代表一天打四次卡
                value: [
                    {
                        isflag: true,//正常
                        namevalue: "上午上班/08:35:00(正常)"
                    },
                    {
                        isflag: false,//异常
                        namevalue: "上午下班/08:35:00(早退)"
                    },
                    {
                        isflag: true,
                        namevalue: "下午上班/---"
                    },
                    {
                        isflag: true,
                        namevalue: "下午下班/---"
                    },
                ]

            }, {
                date: '2',
                type: [0],// 0、代表异常 1、代表加班 2、出差 3、假期 4、节日;
                num: 2,//2、代表一天打两次卡 4、代表一天打四次卡
                value: [
                    {
                        isflag: true,//正常
                        namevalue: "上班/08:35:00(正常)"
                    },
                    {
                        isflag: false,//异常
                        namevalue: "下班/08:35:00(早退)"
                    },

                ]

            }, {
                date: '8',
                type: [3],// 0、代表异常 1、代表加班 2、出差 3、假期 4、节日;
                num: 2,//2、代表一天打两次卡 4、代表一天打四次卡
                value: [
                    {
                        isflag: true,//正常
                        namevalue: "上班/08:35:00(正常)"
                    },
                    {
                        isflag: false,//异常
                        namevalue: "下班/08:35:00(早退)"
                    },

                ]

            }, {
                date: '9',
                type: [4],// 0、代表异常 1、代表加班 2、出差 3、假期 4、节日;
                num: 2,//2、代表一天打两次卡 4、代表一天打四次卡
                value: [
                    {
                        isflag: true,//正常
                        namevalue: "上班/08:35:00(正常)"
                    },
                    {
                        isflag: false,//异常
                        namevalue: "下班/08:35:00(早退)"
                    },

                ]

            }, {
                date: '7',
                type: [1],// 0、代表异常 1、代表加班 2、出差 3、假期 4、节日;
                num: 2,//2、代表一天打两次卡 4、代表一天打四次卡
                value: [
                    {
                        isflag: true,//正常
                        namevalue: "上班/08:35:00(正常)"
                    },
                    {
                        isflag: false,//异常
                        namevalue: "下班/08:35:00(早退)"
                    },

                ]

            }]
        }
    },
    computed: {

    },
    created: function () {
        var _this = this;
        _this.checkYear = _this.nowYear;
        _this.checkMonth = _this.nowMonth;

        setTimeout(function () {
            //初始调用服务请求
            _this.calData = _this.resData;
            _this.getThisMonthDay(_this.checkYear, _this.checkMonth);
            _this.getThisWeekDay(_this.checkYear, _this.checkMonth, 1)
        }, 1000)

    },

    methods: {
        getdate: function (item) {//点击天根据数据渲染右侧的内容
            // console.log(this.checkYear);
            // console.log(this.checkMonth);
            // console.log(item)
            // console.log(this.nowDay);
            
            console.log(`${this.checkYear}-${this.checkMonth}-${item}`);
            
        },
        getThisDay: function () { //返回今天 重新获取今天的数据渲染页面； 
            this.checkYear = this.nowYear;
            this.checkMonth = this.nowMonth;

            //请求数据 this.http;
            this.requreData();
        },
        lastMonthClick: function () {//切换上一个月
            if (this.checkMonth == 1) {
                this.checkYear = this.checkYear - 1;
                this.checkMonth = 12;
            } else {
                this.checkMonth = this.checkMonth - 1;
            }

            //请求数据 this.http;
            this.requreData();

        },
        nextMonthClick: function () {//切换下一个月
            if (this.checkMonth == 12) {
                this.checkYear = this.checkYear + 1;
                this.checkMonth = 1;
            } else {
                this.checkMonth = this.checkMonth + 1;
            }

            //请求数据 this.http;
            this.requreData();
        },
        requreData: function () {
            //请求数据 this.http;
            this.getThisMonthDay(this.checkYear, this.checkMonth);
            this.getThisWeekDay(this.checkYear, this.checkMonth, 1);
        },
        isLeapYear: function (year) {
            var isLeap = false;
            if (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0))) {
                isLeap = true;
            }
            return isLeap;
        },
        getThisMonthDay: function (year, month) {
            var thisDayCount = this.lastDays[month - 1];
            if ((month == 2) && this.isLeapYear(year)) {
                thisDayCount++;
            }
            this.thisDayCount = thisDayCount;
        },
        getThisWeekDay: function (year, month, date) {
            var thisDate = new Date(year, month - 1, date);
            this.ThisWeekDayCounrt = thisDate.getDay();
        },
        cumWeekDayCounrt: function (date) {
            var thisDate = new Date(this.checkYear, this.checkMonth - 1, date);
            return thisDate.getDay();
        }
    }
});