var SeaColor;
(function (SeaColor) {
    var Head;
    (function (Head) {
        // export class getData {
        //     frame_size: { w: number, h: number } = { w: 1098, h: 181 };
        //     slider_list: Array<{
        //         img: string,
        //         title1: string,
        //         title2: string,
        //         des: string,
        //         url: string
        //     }> = [];
        // }
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
            };
            Animate.prototype.showMenu = function () {
                this.$btn.animate({ right: 970 }, 800);
                this.$text.animate({ top: 10, height: 160 }, 800);
                this.$text_left.animate({
                    fontSize: 18,
                    left: 100,
                    top: -26
                }, 800);
                this.$text_right.animate({
                    left: -350,
                    top: -10
                }, 800);
                this.$text_line.addClass('rotate').animate({
                    left: -134,
                    top: -70
                }, 800);
                this.$text_right_h1.animate({ fontSize: 24 }, 800);
                this.$text_right_a.animate({
                    fontSize: 12,
                    left: 24,
                    top: 1
                }, 800);
            };
            return Animate;
        }());
        Head.Animate = Animate;
    })(Head = SeaColor.Head || (SeaColor.Head = {}));
})(SeaColor || (SeaColor = {}));
var animate;
function showAnimate() {
    var img_url = 'http://ts.amoe.me/seacolor/';
    ReactDOM.render((React.createElement("div", {className: "forum_head"}, React.createElement("img", {className: "bg", src: img_url + "images/h_bg.jpg", alt: ""}), React.createElement("div", {className: "topics"}, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {href: "#"}, React.createElement("i", null, "攻略"), React.createElement("span", null, "啊实打实大苏打上啊实打实大苏打"))))), React.createElement("div", {className: "text"}, React.createElement("div", {className: "bg"}), React.createElement("div", {className: "info"}, React.createElement("div", {className: "left"}, "総力戰"), React.createElement("div", {className: "line"}), React.createElement("div", {className: "right"}, React.createElement("h1", null, "海色镇守府"), React.createElement("a", {href: "http://kancolle.aemedia.org/"}, "http://kancolle.aemedia.org/")), React.createElement("div", {className: "clear"}))), React.createElement("div", {className: "btn", id: "btn_forum_head_show"}, React.createElement("div", {className: "bg show"}), React.createElement("div", {className: "bg"}), React.createElement("p", null, "2016"), React.createElement("i", null, "春")))), document.getElementsByClassName('t9_1505190828')[0]);
    animate = new SeaColor.Head.Animate(jQuery('.t9_1505190828'));
    jQuery('#btn_forum_head_show').click(function (e) {
        animate.showMenu();
    });
}
showAnimate();
