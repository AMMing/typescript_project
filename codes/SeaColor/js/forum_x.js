var SeaColor;
(function (SeaColor) {
    var Discuss;
    (function (Discuss) {
        var Data = (function () {
            function Data() {
            }
            Data.prototype.getUserIcon = function (user, size) {
                var id = user.id;
                var id_3 = (id % 100).padLeft(2, '0');
                id = Math.floor(id / 100);
                var id_2 = (id % 100).padLeft(2, '0');
                id = Math.floor(id / 100);
                var id_1 = (id % 100).padLeft(2, '0');
                return "/uc_server/data/avatar/000/" + id_1 + "/" + id_2 + "/" + id_3 + "_avatar_" + size + ".jpg";
            };
            Data.prototype.getUserIcon_Small = function (user) {
                return this.getUserIcon(user, 'small');
            };
            Data.prototype.getUserIcon_Middle = function (user) {
                return this.getUserIcon(user, 'middle');
            };
            Data.prototype.getUserIcon_Big = function (user) {
                return this.getUserIcon(user, 'big');
            };
            Data.prototype.getUserInfo = function ($item) {
                var $a = $item.find('a');
                var url = $a.attr('href');
                var idstr = '';
                var index = url.indexOf('space-uid-');
                if (index >= 0) {
                    idstr = url.substring(index + 'space-uid-'.length);
                    index = idstr.indexOf('.html');
                    idstr = idstr.substring(0, index);
                }
                return {
                    id: parseInt(idstr),
                    name: $a.text()
                };
            };
            Data.prototype.getTopic = function ($item) {
                var $title = $item.find('a.s.xst');
                var $last_comment = $item.find('.by:last em a');
                var topic = {
                    comment_count: parseInt($item.find('em.t9_01').text()),
                    view_count: parseInt($item.find('em.t9_02').text()),
                    title: $title.text().trim(),
                    url: $title.attr('href'),
                    title_color: $title.css('color'),
                    des: $item.find('.common div:last').html(),
                    host: this.getUserInfo($item.find('.by:first cite:first')),
                    last_view: this.getUserInfo($item.find('.by:first cite:last')),
                    date: $last_comment.find('span').attr('title'),
                    date_text: $last_comment.text(),
                    last_comment_url: $last_comment.attr('href')
                };
                if (!topic.date) {
                    topic.date = topic.date_text;
                    topic.date_text = null;
                }
                return topic;
            };
            Data.prototype.getTopicItem = function ($item) {
                return this.getTopic($item);
            };
            Data.prototype.getAllItem = function () {
                return jQuery('#threadlisttableid tbody');
            };
            Data.prototype.getAllTopicItem = function () {
                var _this = this;
                var $items = this.getAllItem();
                return $items.toEnumerable().
                    Select(function (x) { return _this.getTopicItem(x); }).
                    ToArray();
            };
            return Data;
        }());
        Discuss.Data = Data;
    })(Discuss = SeaColor.Discuss || (SeaColor.Discuss = {}));
})(SeaColor || (SeaColor = {}));
var SeaColor;
(function (SeaColor) {
    var Discuss;
    (function (Discuss) {
        var Render = (function () {
            function Render() {
                this.data = new Discuss.Data();
                this.topic_list = [];
                this.default_img_url = 'http://kancolle.aemedia.org/uc_server/images/noavatar_middle.gif';
            }
            Render.prototype.imgLoad = function (e) {
                var img = e.currentTarget;
                var tempimg = new Image();
                var src = img.dataset['src'];
                var complete = function () {
                    // img.src = src
                    img.parentElement.style.backgroundImage = "url(" + src + ")";
                    img.remove();
                };
                tempimg.onload = complete;
                tempimg.src = src;
                if (tempimg.complete) {
                    complete();
                }
            };
            Render.prototype.createItem = function (topic) {
                if (!topic || !topic.title || !topic.url) {
                    return null;
                }
                return (React.createElement("div", {className: "item"}, React.createElement("div", {className: "left"}, React.createElement("div", {className: "bg"}), React.createElement("h4", null, React.createElement("a", {href: topic.url}, topic.title)), React.createElement("div", null, topic.des)), React.createElement("div", {className: "right"}, React.createElement("div", {className: "user"}, React.createElement("img", {src: this.default_img_url, "data-src": this.data.getUserIcon_Middle(topic.host), alt: topic.host.name, onLoad: this.imgLoad})), React.createElement("div", {className: "username"}, topic.host.name)), React.createElement("div", {className: "clear"})));
            };
            Render.prototype.createList = function (list) {
                var _this = this;
                var items = Enumerable.From(list).
                    Select(function (x) { return _this.createItem(x); }).
                    Where(function (x) { return !!x; }).
                    ToArray();
                return (React.createElement("div", {className: "topic_list"}, items));
            };
            Render.prototype.rebuild = function () {
                while (document.body.hasChildNodes()) {
                    document.body.removeChild(document.body.firstChild);
                }
                var div_root = document.createElement('div');
                document.body.appendChild(div_root);
                ReactDOM.render((React.createElement("div", {className: "main_content forum"}, this.createList(this.topic_list))), div_root);
            };
            Render.prototype.init = function () {
                this.topic_list = this.data.getAllTopicItem();
                this.rebuild();
            };
            return Render;
        }());
        Discuss.Render = Render;
    })(Discuss = SeaColor.Discuss || (SeaColor.Discuss = {}));
})(SeaColor || (SeaColor = {}));
(new SeaColor.Discuss.Render()).init();
