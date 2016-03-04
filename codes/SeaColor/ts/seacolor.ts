// ==UserScript==
// @name         海色追加脚本
// @namespace    http://kancolle.aemedia.org/appendjs/By/AMing
// @version      1.0
// @description  海色追加脚本
// @author       AMing
// @match        http://kancolle.aemedia.org/*
// @grant        none
// ==/UserScript==

module AMing.Core {
	/**
	 * 常用方法类
	 * verison:1.1
	 * date:2015-12-16 14:54
	 */
    export class Helper {
        static jq_url: string = 'http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js';
		/**
		 * 是否是方法
         * @param func 方法委托对象
		 */
        static is_func(func: any): boolean {
            return func instanceof Function;
        }
        /**
         * 是否为非空的方法
         * @param func 方法委托对象
         */
        static is_not_null_func(func: any): boolean {
            return this.is_func(func) && func != null;
        }
		/**
		 * 执行非空的方法
		 * @param func_context 方法执行的上下文对象（也就是方法内部this的访问）
		 * @param func 方法对象
		 * @param args 方法的参数
		 */
        static call_func_context(func_context: any, func: any, ...args: any[]): any {
            if (this.is_not_null_func(func)) {
                return (<Function>func).apply(func_context, args);
            }
            return null;
        }
		/**
		 * 执行非空的方法
		 * @param func 方法对象
		 * @param args 方法的参数
		 */
        static call_func(func: any, ...args: any[]): any {
            if (this.is_not_null_func(func)) {
                return (<Function>func).apply(this, args);
            }
            return null;
        }
		/**
		 * 添加js
		 * @param url js的地址
		 * @param onload_func 加载完js之后onload执行的方法
		 */
        static append_js(url: string, onload_func: any = null): HTMLScriptElement {
            let script = document.createElement('script');
            script.src = url;
            if (this.is_not_null_func(onload_func)) {
                script.onload = onload_func;
            }
            document.body.appendChild(script);
            return script;
        }
		/**
		 * 添加jquery，如果jquery已经存在则直接执行ready事件
		 * @param ready ready事件
		 */
        static append_jquery(ready: any = null): void {
            let jqload = () => {
                jQuery(document).ready(jq=> this.call_func(ready));
            };
            if (!window['jQuery']) {
                this.append_js(this.jq_url, jqload);
            } else {
                jqload();
            }
        }
        /**
		 * 添加css
		 * @param url css的地址
		 * @param onload_func 加载完css之后onload执行的方法
		 */
        static append_css(url: string): HTMLLinkElement {
            let link = document.createElement('link');
            link.href = url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            document.head.appendChild(link);

            return link;
        }
		/**
		 * 对象是否为空
		 * @param value 判断的对象
		 */
        static is_null(value: any): boolean {
            return value == undefined || value == null;
        }
		/**
		 * 字符串是否为空或空字符串
		 * @param value 判断的字符串内容
		 */
        static is_null_or_empty(value: string): boolean {
            return this.is_null(value) || value == '';
        }
		/**
		 * 字符串是否为空或空白字符串
		 * @param value 判断的字符串内容
		 */
        static is_null_or_space(value: string): boolean {
            return this.is_null(value) || value.trim() == '';
        }
    }
}
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
            if (now_url.indexOf('debug=ture') > 0) {//手动进入调试页面
                this.is_debug = true;
            }
            if (this.is_debug) {
                this.Js(`seacolor`);
                return;
            }

            this.CssMini('seacolor');
            if (jQuery('#f_pst,#postbox').length > 0) {//包含输入框才加载颜文字js
                this.JsMini('kaomoji');
            }
            if (now_url.indexOf('mod=medal') > 0 && now_url.indexOf('action=log') < 0) {//是勋章页才加载js
                this.JsMini('medal');
            }
        }
    }
}
$(() => (new SeaColor.Append()).init());