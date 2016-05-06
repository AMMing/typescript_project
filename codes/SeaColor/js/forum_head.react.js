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
