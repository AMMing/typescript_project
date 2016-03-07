var SeaColor;
(function (SeaColor) {
    var Forum = (function () {
        function Forum() {
            var list = Enumerable.Range(0, 50).
                Where(function (x) { return x % 2 == 0; }).
                OrderBy(function (x) { return x; }).
                Select(function (x, i) { return (i + "=" + x); }).
                ToArray();
            console.log(list);
        }
        Forum.prototype.getNewItem = function ($item) {
            debugger;
            return null;
        };
        Forum.prototype.getAllItem = function () {
            return jQuery('#threadlist tbody');
        };
        Forum.prototype.getAllNewItem = function () {
            var _this = this;
            var $items = this.getAllItem();
            return $items.toEnumerable().
                Select(function (x) { return _this.getNewItem(x); }).
                TojQuery();
        };
        return Forum;
    })();
    SeaColor.Forum = Forum;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Forum());
//# sourceMappingURL=forum.js.map