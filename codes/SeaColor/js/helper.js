var AMing;
(function (AMing) {
    var Core;
    (function (Core) {
        /**
         * 常用方法类
         * verison:1.1
         * date:2015-12-16 14:54
         */
        var Helper = (function () {
            function Helper() {
            }
            /**
             * 是否是方法
             * @param func 方法委托对象
             */
            Helper.is_func = function (func) {
                return func instanceof Function;
            };
            /**
             * 是否为非空的方法
             * @param func 方法委托对象
             */
            Helper.is_not_null_func = function (func) {
                return this.is_func(func) && func != null;
            };
            /**
             * 执行非空的方法
             * @param func_context 方法执行的上下文对象（也就是方法内部this的访问）
             * @param func 方法对象
             * @param args 方法的参数
             */
            Helper.call_func_context = function (func_context, func) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                if (this.is_not_null_func(func)) {
                    return func.apply(func_context, args);
                }
                return null;
            };
            /**
             * 执行非空的方法
             * @param func 方法对象
             * @param args 方法的参数
             */
            Helper.call_func = function (func) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (this.is_not_null_func(func)) {
                    return func.apply(this, args);
                }
                return null;
            };
            /**
             * 添加js
             * @param url js的地址
             * @param onload_func 加载完js之后onload执行的方法
             */
            Helper.append_js = function (url, onload_func) {
                if (onload_func === void 0) { onload_func = null; }
                var script = document.createElement('script');
                script.src = url;
                if (this.is_not_null_func(onload_func)) {
                    script.onload = onload_func;
                }
                document.body.appendChild(script);
                return script;
            };
            /**
             * 添加jquery，如果jquery已经存在则直接执行ready事件
             * @param ready ready事件
             */
            Helper.append_jquery = function (ready) {
                var _this = this;
                if (ready === void 0) { ready = null; }
                var jqload = function () {
                    jQuery(document).ready(function (jq) { return _this.call_func(ready); });
                };
                if (!window['jQuery']) {
                    this.append_js(this.jq_url, jqload);
                }
                else {
                    jqload();
                }
            };
            /**
             * 添加css
             * @param url css的地址
             * @param onload_func 加载完css之后onload执行的方法
             */
            Helper.append_css = function (url) {
                var link = document.createElement('link');
                link.href = url;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                document.head.appendChild(link);
                return link;
            };
            /**
             * 对象是否为空
             * @param value 判断的对象
             */
            Helper.is_null = function (value) {
                return value == undefined || value == null;
            };
            /**
             * 字符串是否为空或空字符串
             * @param value 判断的字符串内容
             */
            Helper.is_null_or_empty = function (value) {
                return this.is_null(value) || value == '';
            };
            /**
             * 字符串是否为空或空白字符串
             * @param value 判断的字符串内容
             */
            Helper.is_null_or_space = function (value) {
                return this.is_null(value) || value.trim() == '';
            };
            Helper.jq_url = 'http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js';
            return Helper;
        })();
        Core.Helper = Helper;
    })(Core = AMing.Core || (AMing.Core = {}));
})(AMing || (AMing = {}));
var SeaColor;
(function (SeaColor) {
    var Helper = (function () {
        function Helper() {
        }
        Helper.createElement = function (tag) {
            var classnames = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                classnames[_i - 1] = arguments[_i];
            }
            var $item = jQuery("<" + tag + "></" + tag + ">");
            classnames.forEach(function (x) { return $item.addClass(x); });
            return $item;
        };
        Helper.createLink = function (url, text) {
            var classnames = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                classnames[_i - 2] = arguments[_i];
            }
            var $a = this.createElement('a').text(text);
            classnames.forEach(function (x) { return $a.addClass(x); });
            return $a;
        };
        Helper.createImage = function (url, load_func) {
            var img = new Image();
            img.src = url;
            img.onload = load_func;
            return jQuery(img);
        };
        return Helper;
    })();
    SeaColor.Helper = Helper;
})(SeaColor || (SeaColor = {}));
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
};
Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
};
Date.prototype.addMonths = function (m) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};
String.prototype.getRealLenth = function () {
    var str = this, rlen = this.length;
    for (var i = 0, len = rlen; i < len; i++) {
        if (str.charCodeAt(i) > 127)
            rlen++;
    }
    return rlen;
};
String.prototype.getTrimString = function (maxlen, repStr) {
    maxlen = maxlen || this.getRealLenth();
    repStr = repStr || "";
    var rlen = this.getRealLenth(), tarStrArr = [], curlen = repStr.getRealLenth(), curPos = 0;
    if (rlen <= maxlen)
        return this;
    for (var len = this.length; curPos < len; curPos++) {
        var curChar = this.charAt(curPos), curCode = this.charCodeAt(curPos), curCharLen = curCode > 127 ? 2 : 1;
        if (curlen + curCharLen <= maxlen) {
            tarStrArr.push(curChar);
            curlen += curCharLen;
        }
        else {
            break;
        }
    }
    tarStrArr.push(repStr);
    return tarStrArr.join("");
};
Number.prototype.padLeft = function (length, char) {
    if (char === void 0) { char = '0'; }
    return (Array(length).join(char || "0") + this).slice(-length);
};
