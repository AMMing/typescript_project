var SeaColor;
(function (SeaColor) {
    var Settings = (function () {
        function Settings() {
            this.data = {
                medal: true
            };
            this.cookie_key = 'SeaColor.Setting';
        }
        Settings.prototype.getValue = function (key, default_val) {
            var val = jQuery.cookie(this.cookie_key + "_" + key);
            if (val == null) {
                return default_val;
            }
            return val;
        };
        Settings.prototype.setValue = function (key, value) {
            jQuery.cookie(this.cookie_key + "_" + key, value);
        };
        Settings.prototype.initSetting = function () {
            for (var key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                    var item = this.data[key];
                    debugger;
                }
            }
            debugger;
        };
        Settings.prototype.saveSetting = function () {
            jQuery.cookie(this.cookie_key, JSON.stringify(this.data));
        };
        Settings.prototype.init = function () {
            this.initSetting();
            this.saveSetting();
        };
        return Settings;
    }());
    SeaColor.Settings = Settings;
})(SeaColor || (SeaColor = {}));
(new SeaColor.Settings()).init();
//# sourceMappingURL=version.js.map