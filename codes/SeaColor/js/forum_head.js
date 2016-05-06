var SeaColor;
(function (SeaColor) {
    var Head;
    (function (Head) {
        var Write = (function () {
            function Write() {
            }
            Write.prototype.writeItem = function (item) {
                return (React.createElement("li", null, React.createElement("a", {href: item.link, target: "_blank"}, React.createElement("i", null, React.createElement("img", {src: item.img, className: "img1"}), React.createElement("img", {src: item.img2, className: "img2"})), React.createElement("span", null, item.title), React.createElement("b", {className: "clear"}))));
            };
            Write.prototype.writeContent = function (content) {
                var _this = this;
                var item_list = Enumerable.From(Head.Data.list_data)
                    .Select(function (x) { return _this.writeItem(x); })
                    .ToArray();
                ReactDOM.render((React.createElement("div", {className: "forum_head"}, React.createElement("img", {className: "bg", src: Head.Data.img_url + "images/h_bg.jpg", alt: ""}), React.createElement("div", {className: "text"}, React.createElement("div", {className: "bg"}), React.createElement("div", {className: "info"}, React.createElement("div", {className: "left"}, "総力戰"), React.createElement("div", {className: "line"}), React.createElement("div", {className: "right"}, React.createElement("h1", null, "海色镇守府"), React.createElement("a", {href: "http://kancolle.aemedia.org/"}, "http://kancolle.aemedia.org/")), React.createElement("div", {className: "clear"}))), React.createElement("div", {className: "topics"}, React.createElement("ul", null, React.createElement("li", {className: "space"}), item_list, React.createElement("li", {className: "clear"}))), React.createElement("div", {className: "btn", id: "btn_forum_head_show"}, React.createElement("div", {className: "bg waveform"}), React.createElement("div", {className: "bg show"}), React.createElement("p", null, "2016"), React.createElement("i", null, "春")))), content);
            };
            Write.current = new Write();
            return Write;
        }());
        Head.Write = Write;
    })(Head = SeaColor.Head || (SeaColor.Head = {}));
})(SeaColor || (SeaColor = {}));

var SeaColor;
(function (SeaColor) {
    var Head;
    (function (Head) {
        var Data = (function () {
            function Data() {
            }
            Data.img_url = 'http://ts.amoe.me/seacolor/';
            Data.list_data = [
                {
                    img: Data.img_url + "images/map/e1.jpg",
                    img2: Data.img_url + "images/boss/e1.jpg",
                    title: 'E1先行攻略',
                    link: '/thread-29778-1-1.html'
                },
                {
                    img: Data.img_url + "images/map/e2.jpg",
                    img2: Data.img_url + "images/boss/e2.jpg",
                    title: 'E2先行攻略',
                    link: '/thread-29779-1-1.html'
                },
                {
                    img: Data.img_url + "images/map/e3.jpg",
                    img2: Data.img_url + "images/boss/e3.jpg",
                    title: 'E3先行攻略',
                    link: '/thread-29780-1-1.html'
                },
                {
                    img: Data.img_url + "images/map/e4.jpg",
                    img2: Data.img_url + "images/boss/e4.jpg",
                    title: 'E4先行攻略',
                    link: '/thread-29781-1-1.html'
                },
                {
                    img: Data.img_url + "images/map/e5.jpg",
                    img2: Data.img_url + "images/boss/e5.jpg",
                    title: 'E5先行攻略',
                    link: '/thread-29782-1-1.html'
                },
                {
                    img: Data.img_url + "images/map/e6.jpg",
                    img2: Data.img_url + "images/boss/e6.jpg",
                    title: 'E6先行攻略',
                    link: '/thread-29783-1-1.html'
                },
                {
                    img: Data.img_url + "images/map/e7.jpg",
                    img2: Data.img_url + "images/boss/e7.jpg",
                    title: 'E7先行攻略',
                    link: '/thread-29784-1-1.html'
                }
            ];
            return Data;
        }());
        Head.Data = Data;
        var AnimateItem = (function () {
            function AnimateItem($item) {
                this.$item = $item;
                this.auto_timer = 0;
            }
            AnimateItem.prototype.getRandom = function (max) {
                if (max === void 0) { max = 100; }
                return Math.ceil(Math.random() * max);
            };
            AnimateItem.prototype.iconChange = function () {
                var $img1 = this.$item.find('i img.img1');
                var $img2 = this.$item.find('i img.img2');
                if ($img1.hasClass('hide')) {
                    $img1.removeClass('hide');
                    $img2.addClass('hide');
                }
                else {
                    $img1.addClass('hide');
                    $img2.removeClass('hide');
                }
            };
            AnimateItem.prototype.auto = function () {
                var _this = this;
                var time = this.getRandom(10000) + 2000;
                this.auto_timer = setTimeout(function () {
                    _this.iconChange();
                    _this.auto();
                }, time);
            };
            AnimateItem.prototype.stop = function () {
                clearTimeout(this.auto_timer);
            };
            AnimateItem.prototype.show = function () {
                this.$item.addClass('show');
                this.auto();
            };
            AnimateItem.prototype.delayShow = function (time) {
                var _this = this;
                setTimeout(function () { return _this.show(); }, time);
            };
            AnimateItem.prototype.hide = function () {
                this.$item.removeClass('show');
                this.stop();
            };
            AnimateItem.prototype.delayHide = function (time) {
                var _this = this;
                setTimeout(function () { return _this.hide(); }, time);
            };
            return AnimateItem;
        }());
        Head.AnimateItem = AnimateItem;
        var Animate = (function () {
            function Animate($frame) {
                this.$frame = $frame;
                this.$topics_items = [];
                this.menu_playing = false;
                this.menu_is_show = false;
                this.initJQueryObject();
            }
            Animate.prototype.initJQueryObject = function () {
                var _this = this;
                this.$btn = this.$frame.find('.btn');
                this.$text = this.$frame.find('.text');
                this.$text_info = this.$text.find('.info');
                this.$text_left = this.$text_info.find('.left');
                this.$text_line = this.$text_info.find('.line');
                this.$text_right = this.$text_info.find('.right');
                this.$text_right_h1 = this.$text_right.find('h1');
                this.$text_right_a = this.$text_right.find('a');
                this.$topics = this.$frame.find('.topics');
                this.$topics.find('li').each(function (i, x) {
                    return _this.$topics_items.push(new AnimateItem(jQuery(x)));
                });
            };
            Animate.prototype.getItemsPlayTime = function () {
                return 100 * (this.$topics_items.length - 1) + 200;
            };
            Animate.prototype.showItems = function () {
                for (var i = 0; i < this.$topics_items.length; i++) {
                    var item = this.$topics_items[i];
                    item.delayShow(100 * i + 200);
                }
            };
            Animate.prototype.hideItems = function () {
                for (var i = 0; i < this.$topics_items.length; i++) {
                    var item = this.$topics_items[i];
                    item.delayHide(100 * (this.$topics_items.length - i - 1) + 200);
                }
            };
            Animate.prototype.showMenu = function () {
                var _this = this;
                if (this.menu_playing || this.menu_is_show)
                    return;
                this.menu_playing = true;
                var method = 'easeInOutQuad';
                this.$btn.animate({ right: 970 }, 800, method);
                this.$text.animate({ top: 10, height: 160 }, 800, method);
                this.$text_left.animate({
                    fontSize: 18,
                    left: 100,
                    top: -26
                }, 800, method);
                this.$text_right.animate({
                    left: -350,
                    top: -10
                }, 800, method);
                this.$text_line.addClass('rotate').animate({
                    left: -134,
                    top: -70
                }, 800, method);
                this.$text_right_h1.animate({ fontSize: 24 }, 800, method);
                this.$text_right_a.animate({
                    fontSize: 12,
                    left: 24,
                    top: 1
                }, 800, method);
                this.showItems();
                var time = this.getItemsPlayTime();
                setTimeout(function () { return AMing.Core.Helper.call_func_context(_this, function () {
                    _this.menu_is_show = true;
                    _this.menu_playing = false;
                }); }, time);
            };
            Animate.prototype.hideMenu = function () {
                var _this = this;
                var hide_text = function () {
                    if (_this.menu_playing || !_this.menu_is_show)
                        return;
                    _this.menu_playing = true;
                    var method = 'easeInOutQuad';
                    _this.$btn.animate({ right: 20 }, 800, method);
                    _this.$text.animate({ top: 40, height: 100 }, 800, method);
                    _this.$text_left.animate({
                        fontSize: 44,
                        left: 0,
                        top: 0
                    }, 800, method);
                    _this.$text_right.animate({
                        left: 0,
                        top: 0
                    }, 800, method);
                    _this.$text_line.removeClass('rotate').animate({
                        left: 0,
                        top: 0
                    }, 800, method);
                    _this.$text_right_h1.animate({ fontSize: 36 }, 800, method);
                    _this.$text_right_a.animate({
                        fontSize: 16,
                        left: 0,
                        top: 0
                    }, 800, method, function () {
                        _this.menu_is_show = false;
                        _this.menu_playing = false;
                    });
                };
                this.hideItems();
                var time = this.getItemsPlayTime();
                setTimeout(function () { return AMing.Core.Helper.call_func_context(_this, hide_text); }, time);
            };
            Animate.prototype.showHide = function () {
                if (this.menu_is_show) {
                    this.hideMenu();
                }
                else {
                    this.showMenu();
                }
            };
            return Animate;
        }());
        Head.Animate = Animate;
    })(Head = SeaColor.Head || (SeaColor.Head = {}));
})(SeaColor || (SeaColor = {}));
var animate;
function showAnimate() {
    var $content = jQuery('.t9_1505190828');
    $content.animate({ opacity: 0 }, 400, function () {
        SeaColor.Head.Write.current.writeContent($content[0]);
        animate = new SeaColor.Head.Animate($content);
        $content.animate({ opacity: 1 }, 400);
        jQuery('#btn_forum_head_show').click(function (e) {
            animate.showHide();
        });
    });
}
showAnimate();
