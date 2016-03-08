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
                jQuery(document).ready(jq => this.call_func(ready));
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
    export class Helper {

        static createElement(tag: string, ...classnames: Array<string>): JQuery {
            let $item = jQuery(`<${tag}></${tag}>`);
            classnames.forEach(x => $item.addClass(x));

            return $item;
        }
        static createLink(url: string, text: string, ...classnames: Array<string>): JQuery {
            let $a = this.createElement('a').text(text);
            classnames.forEach(x => $a.addClass(x));

            return $a;
        }
        static createImage(url: string, load_func?: (ev: Event) => any): JQuery {
            let img = new Image();
            img.src = url;
            img.onload = load_func;

            return jQuery(img);
        }
    }
}

interface Date {
    /**
    * 时间格式化字符串
    */
    Format(fmt): string;
    /**
    * 添加天数
    */
    addDays(d: number): void;
    /**
    * 添加月数
    */
    addMonths(m: number): void;
}
Date.prototype.Format = function(fmt: string): string { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }

    return fmt;
};
Date.prototype.addDays = function(d: number): void {
    this.setDate(this.getDate() + d);
};
Date.prototype.addMonths = function(m: number): void {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};

interface String {
    /**
    * 获取字符串的真实长度(>127算2个字符长度)
    */
    getRealLenth(): number;
    /**
    * 裁剪字符串，中文按2个长度算
    */
    getTrimString(maxlen: number, repStr: string): string;
}

String.prototype.getRealLenth = function(): number {
    var str = this,
        rlen = this.length;
    for (var i = 0, len = rlen; i < len; i++) {
        if (str.charCodeAt(i) > 127)
            rlen++;
    }
    return rlen;
}
String.prototype.getTrimString = function(maxlen: number, repStr: string): string {
    maxlen = maxlen || this.getRealLenth();
    repStr = repStr || "";
    var rlen = this.getRealLenth(),
        tarStrArr = [],
        curlen = repStr.getRealLenth(),
        curPos = 0;
    if (rlen <= maxlen)
        return this;
    for (var len = this.length; curPos < len; curPos++) {
        var curChar = this.charAt(curPos),
            curCode = this.charCodeAt(curPos),
            curCharLen = curCode > 127 ? 2 : 1;
        if (curlen + curCharLen <= maxlen) {
            tarStrArr.push(curChar);
            curlen += curCharLen;
        } else {
            break;
        }
    }
    tarStrArr.push(repStr);
    return tarStrArr.join("");
}


interface Number {
    /**
     * 自动填充不够长度的数值
     * @param length 长度
     * @param char 填充的字符串
     */
    padLeft(length: number, char: string): string;
}
Number.prototype.padLeft = function(length: number, char: string = '0'): string {
    return (Array(length).join(char || "0") + this).slice(-length);
}