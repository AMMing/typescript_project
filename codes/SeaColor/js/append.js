var SeaColor;
(function (SeaColor) {
    /**
     * 追加引用
     */
    var Append = (function () {
        function Append(temp) {
            this.is_debug = true;
            /**
             * 通用的js目录路径
             */
            this.path = '/template/SeaColor/';
            this.debug_path = 'http://ts.amoe.me/seacolor/';
            alert(temp);
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
            this.is_debug = now_url.indexOf('debug=ture') > 0; //手动进入调试页面
            this.CssMini('append');
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
// (new SeaColor.Append()).init(); 
//# sourceMappingURL=append.js.map