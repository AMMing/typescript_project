var SeaColor;
(function (SeaColor) {
    var Forum = (function () {
        function Forum() {
            var list = Enumerable.Range(0, 50).
                Where(function (x, i) { return x / 2 == 0; }).
                OrderBy(function (x) { return x; });
            console.log(list);
        }
        return Forum;
    })();
    SeaColor.Forum = Forum;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Forum());
//# sourceMappingURL=forum.js.map