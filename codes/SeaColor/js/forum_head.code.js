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
                    img2: Data.img_url + "images/boss/e7.jpg",
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
        var Animate = (function () {
            function Animate($frame) {
                this.$frame = $frame;
                this.initJQueryObject();
            }
            Animate.prototype.initJQueryObject = function () {
                this.$btn = this.$frame.find('.btn');
                this.$text = this.$frame.find('.text');
                this.$text_info = this.$text.find('.info');
                this.$text_left = this.$text_info.find('.left');
                this.$text_line = this.$text_info.find('.line');
                this.$text_right = this.$text_info.find('.right');
                this.$text_right_h1 = this.$text_right.find('h1');
                this.$text_right_a = this.$text_right.find('a');
                this.$topics = this.$text_right.find('.topics');
            };
            Animate.prototype.showMenu = function (callback) {
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
                }, 800, method, callback);
                this.$topics.find('li').each(function (i, x) {
                    setTimeout(function () { return jQuery(x).addClass('show'); }, 200 * i + 200);
                });
            };
            Animate.prototype.waveForm = function ($item) {
                var $bg = $item.find('.bg.waveform');
                var s = 1.5, w = $bg.width(), h = $bg.height();
                $bg.animate({
                    width: w * s,
                    height: h * s,
                    opacity: 0
                }, 2000);
            };
            return Animate;
        }());
        Head.Animate = Animate;
        var Helper = (function () {
            function Helper() {
            }
            return Helper;
        }());
        Head.Helper = Helper;
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
            // animate.showMenu();
            animate.waveForm(animate.$btn);
        });
    });
}
showAnimate();

//# sourceMappingURL=../maps/forum_head.code.js.map
