var is_reload = !!window['SeaColor'] && !!window['SeaColor']['Append'];
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
            this.path = '/seacolor/';
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
        Append.prototype.Js = function (name, onload_func) {
            if (onload_func === void 0) { onload_func = null; }
            AMing.Core.Helper.append_js(this.getFileUrl("js/" + name + ".js"), onload_func);
        };
        /**
         * 引用min.js文件
         * @param name 文件名
         */
        Append.prototype.JsMini = function (name, onload_func) {
            if (onload_func === void 0) { onload_func = null; }
            this.Js("" + name + (this.is_debug ? '' : '.min'), onload_func);
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
        Append.prototype.init = function (debug) {
            var _this = this;
            if (debug === void 0) { debug = false; }
            var now_url = window.location.href.toLowerCase();
            var now_url_path = window.location.pathname.toLowerCase();
            if (now_url.indexOf('close=true') > 0) {
                return;
            }
            if (debug || now_url.indexOf('debug=true') > 0) {
                this.is_debug = true;
            }
            if (!debug && this.is_debug) {
                this.Js("seacolor");
                return;
            }
            this.CssMini('seacolor');
            if (jQuery('#f_pst,#postbox').length > 0) {
                this.JsMini('kaomoji');
            }
            // if (now_url_path.indexOf('forum-') == 1) {//是论坛列表页才加载js
            //     this.JsMini('forum_x');
            // }
            if (now_url_path.indexOf('forum-37-1.html') == 1) {
                this.CssMini('forum_head');
                this.JsMini('forum_head');
            }
            //需要经过配置的项
            this.JsMini('settings', function () {
                //加载完配置才加载这些
                if (now_url.indexOf('mod=medal') > 0 && now_url.indexOf('action=log') < 0) {
                    _this.JsMini('medal_btn');
                    if (seaColor_Settings.data.medal) {
                        _this.JsMini('medal');
                    }
                }
            });
        };
        return Append;
    }());
    SeaColor.Append = Append;
})(SeaColor || (SeaColor = {}));
if (is_reload) {
    var append_1 = new SeaColor.Append();
    AMing.Core.Helper.append_js(append_1.debug_path + "js/lib/all/react.js", function () {
        return AMing.Core.Helper.append_js(append_1.debug_path + "js/lib/all/react-dom.js", function () {
            return AMing.Core.Helper.append_js(append_1.debug_path + "js/lib.min.js", function () { return append_1.init(true); });
        });
    });
}
else {
    $(function () { return (new SeaColor.Append()).init(); });
}
