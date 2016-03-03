module SeaColor {
    /**
     * 追加引用
     */
    export class Append {
        constructor(temp: string) {
            alert(temp);
        }
        is_debug: boolean = true;
        /**
         * 通用的js目录路径
         */
        path: string = '/template/SeaColor/';
        debug_path: string = 'http://ts.amoe.me/seacolor/';
        getFileUrl(name: string): string {
            let url = `${this.path}${name}`;
            if (this.is_debug) {
                url = `${this.debug_path}${name}?v=${(new Date()).getUTCMilliseconds()}`;
            }

            return url;
        }
        /**
         * 引用js文件
         * @param name 文件名
         */
        Js(name: string): void {
            AMing.Core.Helper.append_js(this.getFileUrl(`js/${name}.js`));
        }
        /**
         * 引用min.js文件
         * @param name 文件名
         */
        JsMini(name: string): void {
            this.Js(`${name}${this.is_debug ? '' : '.min'}`);
        }
        /**
         * 引用css文件
         * @param name 文件名
         */
        Css(name: string): void {
            AMing.Core.Helper.append_css(this.getFileUrl(`css/${name}.css`));
        }
        /**
         * 引用min.css文件
         * @param name 文件名
         */
        CssMini(name: string): void {
            this.Css(`${name}${this.is_debug ? '' : '.min'}`);
        }
        /**
         * 初始化
         */
        init(): void {
            let now_url = window.location.href.toLowerCase();
            this.is_debug = now_url.indexOf('debug=ture') > 0;//手动进入调试页面
            this.CssMini('append');
            if (jQuery('#f_pst,#postbox').length > 0) {//包含输入框才加载颜文字js
                this.JsMini('kaomoji');
            }
            if (now_url.indexOf('mod=medal') > 0 && now_url.indexOf('action=log') < 0) {//是勋章页才加载js
                this.JsMini('medal');
            }
        }
    }
}
// (new SeaColor.Append()).init();