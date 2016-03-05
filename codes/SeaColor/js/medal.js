/*
** append scripts by AMing
** update 2016-03-02
*/
var SeaColor;
(function (SeaColor) {
    /**
     * 勋章页分类
     */
    var Medal = (function () {
        function Medal() {
            /**
             * 分类数据
             */
            this.cate_list = [
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
        }
        /**
         * 勋章是否是属于该分类的
         */
        Medal.prototype.isCate = function (cate, $obj) {
            var des = $obj.find('.tip_c p:first-child').text();
            var keyword = cate.key;
            if (!keyword) {
                keyword = cate.name.replace('勋章', '');
            }
            return des.indexOf(keyword) >= 0;
        };
        /**
         * 根据分类筛选勋章
         */
        Medal.prototype.setCateMedals = function (cates, $objs) {
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
        };
        /**
         * 初始化勋章数据
         */
        Medal.prototype.initMedals = function () {
            var medals = [];
            var $medals = this.$page_medal_container.find('li');
            $medals.each(function (i, x) { return medals.push(jQuery(x)); });
            this.setCateMedals(this.cate_list, medals);
            //分配剩下的勋章
            this.cate_list.push({
                name: '准备中',
                medals: medals
            });
        };
        Medal.prototype.createElement = function (tag) {
            return jQuery('<' + tag + '></' + tag + '>');
        };
        Medal.prototype.createClear = function () {
            return this.createElement('div').addClass('clear');
        };
        Medal.prototype.createCateTitle = function (cate) {
            var $title = this.createElement('div').addClass('title');
            $title.append(this.createElement('div').addClass('bg'));
            $title.append(this.createElement('h5').text(cate.name));
            return $title;
        };
        Medal.prototype.createChildCates = function (cates, level) {
            if (cates == null || cates.length <= 0)
                return null;
            var $div = this.createElement('div').addClass('child');
            var show = false;
            for (var i = 0; i < cates.length; i++) {
                var item = cates[i];
                var newdata = this.createCate(item, level);
                $div.append(newdata.item);
                if (newdata.show) {
                    show = true;
                }
            }
            return {
                items: $div,
                show: show
            };
        };
        Medal.prototype.setMedalItem = function ($item) {
            if ($item.find('p:contains("已拥有")').length > 0) {
                $item.addClass('hold');
            }
            else if ($item.find('.xi2').length <= 0) {
                $item.addClass('disable');
            }
        };
        Medal.prototype.createMedals = function (medals) {
            if (medals == null || medals.length <= 0)
                return null;
            var $ul = this.createElement('ul').
                addClass('medals');
            var $li = jQuery('<li></li>');
            for (var i = 0; i < medals.length; i++) {
                var item = medals[i];
                this.setMedalItem(item);
                $ul.append(item);
            }
            return $ul;
        };
        Medal.prototype.createCate = function (cate, level) {
            var show = false;
            var $cate = this.createElement('div').
                addClass('medal_frame').
                addClass("level_" + level);
            $cate.append(this.createCateTitle(cate));
            var childdata = this.createChildCates(cate.child, level + 1);
            if (childdata != null) {
                $cate.append(childdata.items);
                if (childdata.show) {
                    show = true;
                }
            }
            var $medals = this.createMedals(cate.medals);
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
        };
        Medal.prototype.createMedalCates = function () {
            var $div = this.createElement('div').addClass('medal_main');
            for (var i = 0; i < this.cate_list.length; i++) {
                var item = this.cate_list[i];
                var newdata = this.createCate(item, 1);
                $div.append(newdata.item);
            }
            this.$medal_container = $div;
            this.$page_medal_container.empty();
            this.$page_medal_container.after(this.$medal_container);
        };
        Medal.prototype.setBackgorundPosition = function ($item) {
            var item_p = $item.offset();
            $item.css('background-position', (-1 * (item_p.left - this.origin_position.left)) + "px " + -1 * (item_p.top - this.origin_position.top) + "px");
        };
        Medal.prototype.setBackgorund = function () {
            var _this = this;
            this.origin_position = this.$medal_container.offset();
            // jQuery('.medals li').prepend(this.createElement('div').addClass('bg'));//勋章items
            var $items = jQuery('.medals li>.bg,.medal_frame .title >.bg');
            $items.each(function (i, x) { return _this.setBackgorundPosition(jQuery(x)); });
        };
        Medal.prototype.hideAllMedalTip = function () {
            this.$medal_container.find('.medals li .tip').hide();
        };
        Medal.prototype.setMedalTip = function () {
            var _this = this;
            var $medals = this.$medal_container.find('.medals li');
            $medals.find('.mg_img').each(function (i, x) { return x.onmouseover = null; });
            $medals.mouseover(function (e) {
                _this.hideAllMedalTip();
                var $this = jQuery(e.currentTarget);
                $this.find('.tip').show();
            });
            $medals.mouseout(function (e) { return _this.hideAllMedalTip(); });
            $medals.click(function (e) {
                var $this = jQuery(e.currentTarget);
                $this.find('.xi2').trigger('click');
            });
        };
        /**
         * 初始化
         */
        Medal.prototype.init = function () {
            var _this = this;
            this.$page_medal_container = jQuery('ul.mtm.mgcl.cl');
            this.initMedals();
            this.createMedalCates();
            this.setBackgorund();
            this.setMedalTip();
            setTimeout(function () { return _this.setBackgorund(); }, 300);
        };
        return Medal;
    }());
    SeaColor.Medal = Medal;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Medal()).init();
//# sourceMappingURL=medal.js.map