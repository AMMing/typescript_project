/*
** append scripts by AMing
** update 2016-03-02
*/
module SeaColor {
    /**
     * 勋章分类
     */
    export interface MedalCate {
        /**
         * 分类名
         */
        name: string;
        /**
         * 用于辨别勋章分类的关键词 为空时采用分类名作为关键词
         */
        key?: string;
        child?: MedalCate[];
        medals?: JQuery[];
    }
    /**
     * 勋章页分类
     */
    export class Medal {
        /**
         * 分类数据
         */
        cate_list: MedalCate[] = [
            {
                name: '发放中',
                child: [
                    { name: '活动勋章' },
                    { name: '节日勋章' },
                    { name: '海色祭勋章' },
                    {
                        name: '真爱勋章',
                        child: [
                            { name: '2015年冬季款' }
                        ]
                    },
                    { name: '作死勋章' },
                    { name: '杂项' }
                ]
            }, {
                name: '已绝版',
                key: '绝版',
                child: [
                    { name: '活动勋章' },
                    { name: '节日勋章' },
                    { name: '海色祭勋章' },
                    {
                        name: '真爱勋章',
                        child: [
                            { name: '2015年冬季款' }
                        ]
                    },
                    { name: '作死勋章' },
                    { name: '杂项' }
                ]
            }, {
                name: '工作组勋章'
            }
        ];
        $page_medal_container: JQuery;
        $medal_container: JQuery;
        /**
         * 勋章是否是属于该分类的
         */
        isCate(cate: MedalCate, $obj: JQuery): boolean {
            let des = $obj.find('.tip_c p:first-child').text();
            let keyword = cate.key;
            if (!keyword) {
                keyword = cate.name.replace('勋章', '');
            }
            return des.indexOf(keyword) >= 0;
        }
        /**
         * 根据分类筛选勋章
         */
        setCateMedals(cates: MedalCate[], $objs: JQuery[]): void {
            if (cates == null || $objs == null || cates.length <= 0 || $objs.length <= 0) {
                return;
            }
            for (let c = 0; c < cates.length; c++) {
                let cate = cates[c];
                if (cate.medals == null) {
                    cate.medals = [];
                }
                for (let i = 0; i < $objs.length; i++) {
                    let item = $objs[i];
                    if (this.isCate(cate, item)) {
                        let temp = $objs.splice(i, 1);
                        cate.medals.push(temp[0]);
                        i--;
                    }
                }
                //将筛选出来的勋章交给子分类再继续筛选下去
                this.setCateMedals(cate.child, cate.medals);
            }
        }
        /**
         * 初始化勋章数据 
         */
        initMedals(): void {
            let medals = [];
            let $medals = this.$page_medal_container.find('li');
            $medals.each((i, x) => medals.push(jQuery(x)));
            this.setCateMedals(this.cate_list, medals);
            //分配剩下的勋章
            this.cate_list.push({
                name: '准备中',
                medals: medals
            });
        }
        createElement(tag: string): JQuery {
            return jQuery('<' + tag + '></' + tag + '>');
        }
        createClear(): JQuery {
            return this.createElement('div').addClass('clear');
        }

        createCateTitle(cate: MedalCate): JQuery {
            let $title = this.createElement('div').addClass('title');
            $title.append(this.createElement('div').addClass('bg'));
            $title.append(this.createElement('h5').text(cate.name));

            return $title;
        }
        createChildCates(cates: MedalCate[], level: number): { items: JQuery, show: boolean } {
            if (cates == null || cates.length <= 0) return null;

            let $div = this.createElement('div').addClass('child');
            let show = false;
            for (let i = 0; i < cates.length; i++) {
                let item = cates[i];
                let newdata = this.createCate(item, level);
                $div.append(newdata.item);
                if (newdata.show) {
                    show = true;
                }
            }

            return {
                items: $div,
                show: show
            };
        }
        setMedalItem($item: JQuery): void {
            if ($item.find('.xi2').length <= 0) {
                $item.addClass('disable');
            }
        }
        createMedals(medals: JQuery[]): JQuery {
            if (medals == null || medals.length <= 0) return null;

            let $ul = this.createElement('ul').
                addClass('medals');
            let $li = jQuery('<li></li>');
            for (let i = 0; i < medals.length; i++) {
                let item = medals[i];
                this.setMedalItem(item);
                $ul.append(item);
            }

            return $ul;
        }
        createCate(cate: MedalCate, level: number): { item: JQuery, show: boolean } {
            let show = false;
            let $cate = this.createElement('div').
                addClass('medal_frame').
                addClass(`level_${level}`);
            $cate.append(this.createCateTitle(cate));
            let childdata = this.createChildCates(cate.child, level + 1);
            if (childdata != null) {
                $cate.append(childdata.items);
                if (childdata.show) {
                    show = true;
                }
            }
            let $medals = this.createMedals(cate.medals);
            if ($medals != null) {
                $cate.append($medals);
                show = true;
            }
            if (show) {
                $cate.addClass('show');
            }
            $cate.append(this.createClear());

            return {
                item: $cate,
                show: show
            };
        }

        createMedalCates() {
            let $div = this.createElement('div').addClass('medal_main');
            for (let i = 0; i < this.cate_list.length; i++) {
                let item = this.cate_list[i];
                let newdata = this.createCate(item, 1);
                $div.append(newdata.item);
            }
            this.$medal_container = $div;
            this.$page_medal_container.empty();
            this.$page_medal_container.after(this.$medal_container);
        }
        origin_position: JQueryCoordinates;
        setBackgorundPosition($item: JQuery): void {
            let item_p = $item.offset();
            $item.css('background-position', `${(-1 * (item_p.left - this.origin_position.left))}px ${-1 * (item_p.top - this.origin_position.top)}px`);
        }
        setBackgorund(): void {
            this.origin_position = this.$medal_container.offset();
            // jQuery('.medals li').prepend(this.createElement('div').addClass('bg'));//勋章items
            let $items = jQuery('.medals li>.bg,.medal_frame .title >.bg');
            $items.each((i, x) => this.setBackgorundPosition(jQuery(x)));
        }
        hideAllMedalTip(): void {
            this.$medal_container.find('.medals li .tip').hide();
        }
        setMedalTip(): void {
            let $medals = this.$medal_container.find('.medals li');
            $medals.find('.mg_img').each((i, x) => (x as HTMLDivElement).onmouseover = null);
            $medals.mouseover(e => {
                this.hideAllMedalTip();
                let $this = jQuery(e.currentTarget);
                $this.find('.tip').show();
            });
            $medals.mouseout(e=> this.hideAllMedalTip());
            $medals.click(e=> {
                let $this = jQuery(e.currentTarget);
                $this.find('.xi2').trigger('click');
            });
        }
        
        /**
         * 初始化
         */
        init(): void {
            this.$page_medal_container = jQuery('ul.mtm.mgcl.cl');
            this.initMedals();
            this.createMedalCates();
            this.setBackgorund();
            this.setMedalTip();
            setTimeout(() => this.setBackgorund(), 300);
        }
    }
}
(new SeaColor.Medal()).init();