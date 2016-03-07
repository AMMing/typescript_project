let is_reload = !!window['SeaColor'] && !!window['SeaColor']['Append'];
module SeaColor {
    /**
     * 追加引用
     */
    export class Append {
        //正式上传的时候改成false
        is_debug: boolean = false;
        /**
         * 通用的js目录路径
         */
        path: string = '/seacolor/';
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
        Js(name: string, onload_func: any = null): void {
            AMing.Core.Helper.append_js(this.getFileUrl(`js/${name}.js`), onload_func);
        }
        /**
         * 引用min.js文件
         * @param name 文件名
         */
        JsMini(name: string, onload_func: any = null): void {
            this.Js(`${name}${this.is_debug ? '' : '.min'}`, onload_func);
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
        init(debug: boolean = false): void {
            let now_url = window.location.href.toLowerCase();
            let now_url_path = window.location.pathname.toLowerCase();

            if (now_url.indexOf('close=true') > 0) {
                return;
            }
            if (debug || now_url.indexOf('debug=true') > 0) {//手动进入调试页面
                this.is_debug = true;
            }
            if (!debug && this.is_debug) {
                this.Js(`seacolor`);
                return;
            }

            this.CssMini('seacolor');
            if (jQuery('#f_pst,#postbox').length > 0) {//包含输入框才加载颜文字js
                this.JsMini('kaomoji');
            }
            if (now_url_path.indexOf('forum-') == 1) {//是论坛列表页才加载js
                this.JsMini('forum');
            }
            //需要经过配置的项
            this.JsMini('settings', () => {
                //加载完配置才加载这些
                if (now_url.indexOf('mod=medal') > 0 && now_url.indexOf('action=log') < 0) {//是勋章页才加载js
                    this.JsMini('medal_btn');
                    if (seaColor_Settings.data.medal) {
                        this.JsMini('medal');
                    }
                }
            });

        }
    }
}

if (is_reload) {
    let append = new SeaColor.Append();
    AMing.Core.Helper.append_js(`${append.debug_path}js/lib.min.js`, () => append.init(true));
} else {
    $(() => (new SeaColor.Append()).init());
}