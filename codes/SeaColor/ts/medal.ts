/*
** append scripts by AMing
** update 2016-03-02
*/
module SeaColor {
    /**
     * 勋章分类
     */
    export interface MedalCate {
        id: number;
        /**
         * 分级分类ID，0为顶级分类
         */
        parent_id: number;
        /**
         * 分类名
         */
        name: string;
        /**
         * 用于辨别勋章分类的关键词
         */
        key: string;
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
        cate_data: MedalCate[] = [
            {
                id: 1,
                parent_id: 0,
                name: '发放中',
                key: '钢100'
            }, {
                id: 2,
                parent_id: 0,
                name: '绝版',
                key: '绝版'
            }, {
                id: 3,
                parent_id: 1,
                name: '真爱',
                key: '真爱'
            }, {
                id: 4,
                parent_id: 2,
                name: '甲',
                key: '甲'
            }, {
                id: 5,
                parent_id: 4,
                name: '2015',
                key: '2015'
            }
        ];
        /**
         * 归分完子父的分类列表
         */
        cate_list: MedalCate[];
        $page_medal_container: JQuery;
        $medal_container: JQuery;
        /**
         * 归分子父分类
         */
        setCateChild(parent_id: number = 0): MedalCate[] {
            var list = [];
            for (var i = 0; i < this.cate_data.length; i++) {
                var item = this.cate_data[i];
                if (item.parent_id == parent_id) {
                    item.child = this.setCateChild(item.id);
                    list.push(item);
                }
            }

            return list;
        }
        /**
         * 勋章是否是属于该分类的
         */
        isCate(cate: MedalCate, $obj: JQuery): boolean {
            var des = $obj.find('.tip_c p:first-child').text();
            return des.indexOf(cate.key) >= 0;
        }
        /**
         * 根据分类筛选勋章
         */
        setCateMedals(cates: MedalCate[], $objs: JQuery[]): void {
            if (cates == null || $objs == null || cates.length <= 0 || $objs.length <= 0) {
                return;
            }
            for (var c = 0; c < cates.length; c++) {
                var cate = cates[c];
                if (cate.medals == null) {
                    cate.medals = [];
                }
                for (var i = 0; i < $objs.length; i++) {
                    var item = $objs[i];
                    if (this.isCate(cate, item)) {
                        var temp = $objs.splice(i, 1);
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
            var medals = [];
            var $medals = this.$page_medal_container.find('li');
            $medals.each((i, x) => medals.push(jQuery(x)));
            this.setCateMedals(this.cate_list, medals);
            //分配剩下的勋章
            this.cate_list.push({
                id: 9999,
                parent_id: 0,
                name: '其他',
                key: null,
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
            var $title = this.createElement('div').addClass('title');
            $title.append(this.createElement('div').addClass('bg'));
            $title.append(this.createElement('h5').text(cate.name));

            return $title;
        }
        createChildCates(cates: MedalCate[], level: number): JQuery {
            if (cates == null || cates.length <= 0) return null;

            var $div = this.createElement('div').addClass('child');
            for (var i = 0; i < cates.length; i++) {
                var item = cates[i];
                $div.append(this.createCate(item, level));
            }

            return $div;
        }
        createMedals(medals: JQuery[]): JQuery {
            if (medals == null || medals.length <= 0) return null;

            var $ul = this.createElement('ul').
                addClass('medals');
            var $li = jQuery('<li></li>');
            for (var i = 0; i < medals.length; i++) {
                var item = medals[i];
                $ul.append(item);
            }

            return $ul;
        }
        createCate(cate: MedalCate, level: number): JQuery {
            var $cate = this.createElement('div').
                addClass('medal_frame').
                addClass(`level_${level}`).
                data('cate_id', cate.id);
            $cate.append(this.createCateTitle(cate));
            var $childs = this.createChildCates(cate.child, level + 1);
            if ($childs != null) {
                $cate.append($childs);
            }
            var $medals = this.createMedals(cate.medals);
            if ($medals != null) {
                $cate.append($medals);
            }
            $cate.append(this.createClear());

            return $cate;
        }

        createMedalCates() {
            var $div = this.createElement('div').addClass('medal_main');
            for (var i = 0; i < this.cate_list.length; i++) {
                var item = this.cate_list[i];
                $div.append(this.createCate(item, 1));
            }
            this.$medal_container = $div;
            this.$page_medal_container.empty();
            this.$page_medal_container.after(this.$medal_container);
        }
        origin_position: JQueryCoordinates;
        setBackgorundPosition($item: JQuery): void {
            var item_p = $item.offset();
            $item.css('background-position', `${(-1 * (item_p.left - this.origin_position.left))}px ${-1 * (item_p.top - this.origin_position.top)}px`);
        }
        setBackgorund(): void {
            this.origin_position = this.$medal_container.offset();
            jQuery('.medals li').prepend(this.createElement('div').addClass('bg'));
            var $items = jQuery('.medals li>.bg,.medal_frame .title >.bg');
            $items.each((i, x) => this.setBackgorundPosition(jQuery(x)));
        }
        
        /**
         * 初始化
         */
        init(): void {
            this.$page_medal_container = jQuery('ul.mtm.mgcl.cl');
            this.cate_list = this.setCateChild();
            this.initMedals();
            this.createMedalCates();
            this.setBackgorund();
            setTimeout(() => this.setBackgorund(), 300);
        }
    }
}
(new SeaColor.Medal()).init();