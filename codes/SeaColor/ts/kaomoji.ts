/**
 * 插入内容到完整编辑器
 */
declare function insertText(text: string, val: any);
/**
 * 插入内容到小型编辑器
 */
declare function seditor_insertunit(text: string, val: any);
/*
** append kaomoji scripts by AMing
** update 2016-02-22
*/
module SeaColor {
    /**
     * 编辑器添加颜文字
     */
    export class Kaomoji {
        /**
         *  颜文字列表
         */
        text_list: string[] = [
            '٩(๑´0`๑)۶',
            'ヾ(◍°∇°◍)ﾉﾞ',
            'ヾ(❀╹◡╹)ﾉ~',
            'ฅ( ̳• ◡ • ̳)ฅ',
            '(´,,•∀•,,`)',
            '٩(๑❛ᴗ❛๑)۶',
            '*罒▽罒*',
            '´∀`',
            '(๑>؂<๑）',
            'ヽ●*´∀`*●ﾉ',
            'ヾ(Ő∀Ő๑)ﾉ',
            '(*´・ｖ・)',
            '(´･ω･`)',
            '(´∇ﾉ‘*)ノ',
            '(‘・ω・´)”',
            '٩(✘д✘๑;)۶',
            '(/ﾟДﾟ)/',
            '(,,#ﾟДﾟ)',
            '(＃‘д´)ﾉ',
            '( •̥́ ˍ •̀ू )',
            '(๑ó△ò๑)',
            '(*/ω＼*)',
            '(*´∀`*)',
            '(๑•́ ₃ •̀๑)',
            '*\\(๑• ₃ •๑)*',
            '( ･ω･)ﾉ',
            '(｡´∀‘)ﾉ',
            '(o´Д`)',
            '(╯｀皿′)╯（┻━┻',
            '(/"≡ _ ≡)/~┴┴（#－.－）',
            '(╯°□°）╯（ ┻━┻',
            '┻━┻〜☆　ヽ(´∇‘ヽ)',
            '(๑•̀ㅂ•́)و✧',
            '✧*｡٩(ˊωˋ*)و✧*｡',
            '∑(・ω・ﾉ)ﾉ',
            '∑(゜ロ゜;)',
            '∑(ﾟДﾟ|||)',
            'Ծ‸Ծ',
            '｢(ﾟﾍﾟ)',
            '눈_눈',
            '(・_・ヾ',
            '_(:_」∠)_',
            '_(•̀ω•́ 」∠)_',
            '_§:з)))」∠)_',
            '_8(:з」∠)_',
            '٩(๑❛ᴗ❛๑)۶',
            '(｡•́__ก̀｡)',
            'ლ(°Д°ლ)',
            '(ʘ̆ʚʘ̆)',
            '٩(๑´3‘๑)۶',
            '(｡˘•ε•˘｡)',
            'Z(∩3∩)Z',
            '(ΦωΦ)',
            '（=ˇωˇ=）',
            '（⺻▽⺻ ）',
            '。(;￢д￢)',
            '(　･ิω･ิ)ノิ ',
            'o(￣ヘ￣o＃).',
            '.(｡￫‿￩｡)',
            '(,,Ծ▽Ծ,,)',
            '(｡▰‿‿▰｡) ❤',
            '( ´◔ ‸◔\')',
            'Σ(°Д°;',
            '(°Д°)',
            '∑(￣□￣;)',
            'Σ(・ω・ノ)ノ',
            '(ﾟﾛ ﾟﾉ)ﾉ',
            'Σ┗(＠ロ＠;)┛',
            'Σヽ(ﾟД ﾟ; )ﾉ',
            '( ´∀｀)σ',
            '(σ´□｀)σ',
            '( ﾟДﾟ)σ'
        ];
        /**
         * 表情列表容器
         */
        $img_listbox: JQuery;
        /**
         * 插入到输入框的方法
         */
        insert_func: any = null;

        /****** methods *******/

        /**
         * 创建item
         * @param text 文字
         */
        createItem(text: string): JQuery {
            let span = jQuery('<span></span>').
                html(text);

            return jQuery('<li></li>').
                append(span).
                attr('data-val', text);
        }
        /**
         * 创建编辑器上面的按钮
         */
        createButton(): JQuery {
            return jQuery('<a id="e_current_sml" title="颜文字" href="javascript:;" initialized="true">颜文字</a>').
                css({
                    backgroundPosition: '-3px -80px'
                });
        }
        /**
         * 创建迷你编辑器上面的按钮
         */
        createMiniBtn(): JQuery {
            return jQuery('<a href="javascript:;" class="fsml mini_btn_sml" fwin="reply">颜文字</a>').
                css({
                    backgroundPosition: '-20px -20px'
                });
        }
        /**
         * 创建列表
         */
        createListbox(): JQuery {
            let close = jQuery('<div></div>').
                addClass('close');
            let ul = jQuery('<ul></ul>');
            jQuery.each(this.text_list, (i, x) => ul.append(this.createItem(x)));

            return jQuery('<div></div>').
                addClass('asciiemot_div').
                append(close).
                append(ul);
        }
        /**
         * 显示表情列表
         * @param p 坐标
         */
        showDialog(p): void {
            this.$img_listbox.css({
                top: p.top,
                left: p.left
            });
            this.$img_listbox.show();
        }
        /**
         * 隐藏表情列表
         */
        hideDialog(): void {
            this.$img_listbox.hide();
        }
        /**
         * 插入到完整编辑器的方法
         * @param val 内容
         */
        insertTextToFull(val): void {
            insertText(val, false);
        }
        /**
         * 插入到迷你编辑器的方法
         * @param val 内容
         */
        insertTextToMini(val): void {
            seditor_insertunit('fastpost', val);
        }
        /**
         * 插入到回复编辑器的方法
         * @param val 内容
         */
        insertTextToReply(val): void {
            seditor_insertunit('post', val);
        }
        /**
         * 是否存在完整编辑器（编辑页面）
         */
        hasEdit(): boolean {
            return jQuery('#e_body').length > 0;
        }
        /**
         * 是否存在迷你编辑器
         */
        hasMiniEdit(): boolean {
            return jQuery('#fastpostform').length > 0;
        }
        /**
         * 是否存在回复编辑器
         */
        hasReplyEdit(): boolean {
            let $edit = jQuery('#postform');
            let fwin = $edit.attr('fwin');

            return $edit.length > 0 && fwin == 'reply';
        }
        /**
         * 是否存在迷你按钮
         * @param $obj
         */
        hasMiniBtn($obj): boolean {
            return $obj.find('.mini_btn_sml').length > 0;
        }
        /**
         * 绑定按钮事件
         * @param $obj 按钮对象
         */
        bindButtonsEvent($obj: JQuery): void {
            $obj.bind('click', e=> {
                if (this.$img_listbox.css('display') == 'none') {
                    let p = jQuery(e.currentTarget).offset();
                    this.insert_func = this.insertTextToFull;
                    this.showDialog({
                        top: p.top + 50,
                        left: p.left - 100
                    });

                } else {
                    this.hideDialog();
                }
            });
        }
        /**
         * 绑定迷你按钮事件
         * @param $obj 按钮对象
         */
        bindMiniButtonEvent($obj: JQuery): void {
            $obj.bind('click', e=> {
                if (this.$img_listbox.css('display') == 'none') {
                    let p = jQuery(e.currentTarget).offset();
                    this.insert_func = this.insertTextToMini;
                    this.showDialog({
                        top: p.top + 25,
                        left: p.left - 40
                    });

                } else {
                    this.hideDialog();
                }
            });
        }
        /**
         * 绑定恢复编辑器按钮事件
         * @param $obj 按钮对象
         */
        bindReplyButtonEvent($obj: JQuery): void {
            $obj.bind('click', e=> {
                if (this.$img_listbox.css('display') == 'none') {
                    let p = jQuery(e.currentTarget).offset();
                    this.insert_func = this.insertTextToReply;
                    this.showDialog(p);
                } else {
                    this.hideDialog();
                }
            });
        }
        /**
         * 绑定列表事件
         * @param $div
         */
        bindImagelistEvent($div: JQuery): void {
            $div.find('li').bind('click', e=> {
                let val = jQuery(e.currentTarget).data('val');
                if (!!val) {
                    this.insert_func(val);
                    this.hideDialog();
                }
            });
            $div.find('.close').bind('click', () => this.hideDialog());
        }
        /**
         * 设置样式
         * @param $div 容器
         */
        setCss($div: JQuery): void {
            $div.css({
                width: '530px',
                height: '300px',
                border: '1px solid #ccc',
                position: 'absolute',
                background: '#eee',
                display: 'none',
                top: '0',
                left: '0',
                zIndex: '998'
            });
            $div.find('ul').css({
                width: '520px',
                height: '270px',
                margin: '25px 5px 5px 5px',
                overflowY: 'scroll',
                padding: '0'
            });
            $div.find('li').css({
                listStyle: 'none',
                float: 'left',
                width: 'auto',
                height: '20px',
                margin: '2px',
                border: '1px solid #ccc',
                textAlign: 'center',
                cursor: 'pointer',
                background: '#fff',
                overflow: 'hidden',
                padding: '2px 5px'
            });
            $div.find('.close').css({
                width: '20px',
                height: '20px',
                position: 'absolute',
                background: '#FF0',
                top: '4px',
                right: '5px',
                cursor: 'pointer',
            }).css({
                background: 'url(http://kancolle.aemedia.org/./template/999test_cn_img/dz_model_15020401/common/cls.gif) no-repeat 0 0'
            });
        }

        /**
         * 添加到页面
         */
        appendToBody(): void {
            if (jQuery('.asciiemot_div').length > 0) return;

            jQuery('body').append(this.$img_listbox);
        }
        /**
         * 初始化listbox
         */
        initImageList(): void {
            let $listbox = this.createListbox();
            this.setCss($listbox);
            this.bindImagelistEvent($listbox);
            this.$img_listbox = $listbox;
            this.appendToBody();
        }
        /**
         * 初始化完整编辑器
         */
        initFullEdit(): void {
            if (!this.hasEdit()) return;

            let btn = this.createButton();
            jQuery('#e_body #e_sml').after(btn);
            this.bindButtonsEvent(btn);
        }
        /**
         * 初始化迷你编辑器
         */
        initMiniEdit(): void {
            if (!this.hasMiniEdit()) return;

            let btn = this.createMiniBtn();
            jQuery('#fastpostform #fastpostsml').after(btn);
            this.bindMiniButtonEvent(btn);
        }
        /**
         * 初始化回复编辑器
         * @param interval 清除interval
         */
        initReplyEdit(interval: number): void {
            //if (!this.hasReplyEdit() && this.hasMiniBtn()) return;
            if (!this.hasReplyEdit()) return;

            console.log('initReplyEdit');
            clearInterval(interval);
            let btn = this.createMiniBtn();
            jQuery('#postform #postsml').after(btn);
            this.bindReplyButtonEvent(btn);
        }
        /**
         * 延迟初始化回复编辑器
         */
        bindReplayShowEvent(): void {
            jQuery('.fastre').bind('click', () => {
                let interval = setInterval(() => this.initReplyEdit(interval), 500);
            });
        }
        /**
         * 初始化
         */
        init(): void {
            this.initFullEdit();
            this.initMiniEdit();
            this.initImageList();
            this.bindReplayShowEvent();
        }
    }
}
(new SeaColor.Kaomoji()).init();