var SeaColor;
(function (SeaColor) {
    /**
     * 勋章页分类
     */
    var Medal = (function () {
        function Medal() {
            this.cate = [
                {
                    id: 1,
                    parent_id: 0,
                    name: '发放中',
                    key: '发放中'
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
                    name: '真爱',
                    key: '真爱'
                }
            ];
            /**
             * 分类的最小级数
             */
            this.cate_level = 3;
        }
        Medal.prototype.init = function () {
        };
        return Medal;
    }());
    SeaColor.Medal = Medal;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Medal()).init();
//# sourceMappingURL=medal.js.map