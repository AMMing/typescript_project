var SeaColor;
(function (SeaColor) {
    var Medal_Global = (function () {
        function Medal_Global() {
        }
        Medal_Global.prototype.createChangeButton = function () {
            var $btn = jQuery('<div></div>').
                addClass('seacolor').
                addClass('button').
                addClass('medal_btn').
                text(seaColor_Settings.data.medal ? '切换到旧版' : '切换到新版').
                click(function () {
                seaColor_Settings.data.medal = !seaColor_Settings.data.medal;
                seaColor_Settings.saveSetting();
                window.location.reload();
            });
            jQuery('.tbmu:first').append($btn).css({ position: 'relative' });
        };
        Medal_Global.prototype.init = function () {
            this.createChangeButton();
        };
        return Medal_Global;
    })();
    SeaColor.Medal_Global = Medal_Global;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Medal_Global()).init();
