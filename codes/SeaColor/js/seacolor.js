// ==UserScript==
// @name         海色追加脚本
// @namespace    http://kancolle.aemedia.org/appendjs/By/AMing
// @version      1.0
// @description  海色追加脚本
// @author       AMing
// @match        http://kancolle.aemedia.org/*
// @grant        none
// ==/UserScript==
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
        }());
        Core.Helper = Helper;
    })(Core = AMing.Core || (AMing.Core = {}));
})(AMing || (AMing = {}));
var SeaColor;
(function (SeaColor) {
    /**
     * 追加引用
     */
    var Append = (function () {
        function Append() {
            //正式上传的时候改成false
            this.is_debug = false;
            /**
             * 通用的js目录路径
             */
            this.path = '/template/SeaColor/';
            this.debug_path = 'http://ts.amoe.me/seacolor/';
        }
        Append.prototype.getFileUrl = function (name) {
            var url = "" + this.path + name;
            if (this.is_debug) {
                url = "" + this.debug_path + name + "?v=" + (new Date()).getUTCMilliseconds();
            }
            return url;
        };
        /**
         * 引用js文件
         * @param name 文件名
         */
        Append.prototype.Js = function (name) {
            AMing.Core.Helper.append_js(this.getFileUrl("js/" + name + ".js"));
        };
        /**
         * 引用min.js文件
         * @param name 文件名
         */
        Append.prototype.JsMini = function (name) {
            this.Js("" + name + (this.is_debug ? '' : '.min'));
        };
        /**
         * 引用css文件
         * @param name 文件名
         */
        Append.prototype.Css = function (name) {
            AMing.Core.Helper.append_css(this.getFileUrl("css/" + name + ".css"));
        };
        /**
         * 引用min.css文件
         * @param name 文件名
         */
        Append.prototype.CssMini = function (name) {
            this.Css("" + name + (this.is_debug ? '' : '.min'));
        };
        /**
         * 初始化
         */
        Append.prototype.init = function () {
            var now_url = window.location.href.toLowerCase();
            if (now_url.indexOf('debug=ture') > 0) {
                this.is_debug = true;
            }
            if (this.is_debug) {
                this.Js("seacolor");
                return;
            }
            this.CssMini('seacolor');
            if (jQuery('#f_pst,#postbox').length > 0) {
                this.JsMini('kaomoji');
            }
            if (now_url.indexOf('mod=medal') > 0 && now_url.indexOf('action=log') < 0) {
                this.JsMini('medal');
            }
        };
        return Append;
    }());
    SeaColor.Append = Append;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Append()).init();
//# sourceMappingURL=seacolor.js.map