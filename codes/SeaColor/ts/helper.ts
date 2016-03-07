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