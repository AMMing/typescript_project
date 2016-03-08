var SeaColor;
(function (SeaColor) {
    /**
     * 论坛列表数据
     */
    var ForumData = (function () {
        function ForumData() {
        }
        ForumData.prototype.getUserIcon = function (user, size) {
            var id = user.id;
            var id_3 = (id % 100).padLeft(2, '0');
            id = Math.floor(id / 100);
            var id_2 = (id % 100).padLeft(2, '0');
            id = Math.floor(id / 100);
            var id_1 = (id % 100).padLeft(2, '0');
            return "/uc_server/data/avatar/000/" + id_1 + "/" + id_2 + "/" + id_3 + "_avatar_" + size + ".jpg";
        };
        ForumData.prototype.getUserIcon_Small = function (user) {
            return this.getUserIcon(user, 'small');
        };
        ForumData.prototype.getUserIcon_Middle = function (user) {
            return this.getUserIcon(user, 'middle');
        };
        ForumData.prototype.getUserIcon_Big = function (user) {
            return this.getUserIcon(user, 'big');
        };
        ForumData.prototype.getUserInfo = function ($item) {
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
        ForumData.prototype.getTopic = function ($item) {
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
        ForumData.prototype.getTopicItem = function ($item) {
            return this.getTopic($item);
        };
        ForumData.prototype.getAllItem = function () {
            return jQuery('#threadlisttableid tbody');
        };
        ForumData.prototype.getAllTopicItem = function () {
            var _this = this;
            var $items = this.getAllItem();
            return $items.toEnumerable().
                Select(function (x) { return _this.getTopicItem(x); }).
                ToArray();
        };
        return ForumData;
    })();
    SeaColor.ForumData = ForumData;
    var Forum = (function () {
        function Forum() {
            this.data = new ForumData();
            this.topic_list = [];
        }
        Forum.prototype.createItem = function (topic) {
            if (!topic || !topic.title || !topic.url) {
                return null;
            }
            return SeaColor.Helper.createElement('div', 'item').
                append(SeaColor.Helper.createElement('div', 'left').
                append(SeaColor.Helper.createElement('div', 'bg')).
                append(SeaColor.Helper.createElement('h4').
                append(SeaColor.Helper.createLink(topic.url, topic.title))).
                append(SeaColor.Helper.createElement('div').
                html(topic.des))).
                append(SeaColor.Helper.createElement('div', 'right').
                append(SeaColor.Helper.createElement('div', 'user').
                append(SeaColor.Helper.createImage(this.data.getUserIcon_Middle(topic.host))).
                append(SeaColor.Helper.createElement('div').text(topic.host.name)))).
                append(SeaColor.Helper.createElement('div', 'clear'));
        };
        // createList(list: Array<Topic>): JQuery {
        //     return Helper.createElement('div', 'topic_list').
        //         append(Enumerable.From(list).
        //             Select(x => this.createItem(x)).
        //             Where(x => !!x).
        //             TojQuery()
        //         );
        // }
        Forum.prototype.createList = function (list) {
            var _this = this;
            var $div = SeaColor.Helper.createElement('div', 'topic_list');
            Enumerable.From(list).
                Select(function (x) { return _this.createItem(x); }).
                Where(function (x) { return !!x; }).
                ForEach(function (x) { return $div.append(x); });
            return $div;
        };
        Forum.prototype.rebuild = function () {
            var $body = jQuery('body');
            $body.empty().append(SeaColor.Helper.createElement('div', 'main_content', 'forum').
                append(this.createList(this.topic_list)) //添加列表
            );
        };
        Forum.prototype.init = function () {
            this.topic_list = this.data.getAllTopicItem();
            this.rebuild();
            debugger;
        };
        return Forum;
    })();
    SeaColor.Forum = Forum;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Forum()).init();
