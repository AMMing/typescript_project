var SeaColor;
(function (SeaColor) {
    var Settings = (function () {
        function Settings() {
            this.data = {
                medal: true
            };
            this.cookie_key = 'SeaColor.Settings';
        }
        Settings.prototype.getValue = function (key, default_val) {
            var val = jQuery.cookie(this.cookie_key + "_" + key);
            if (val == null) {
                return default_val;
            }
            return val;
        };
        Settings.prototype.setValue = function (key, value) {
            jQuery.cookie(this.cookie_key + "_" + key, value, { expires: 999 });
        };
        Settings.prototype.initSetting = function () {
            for (var key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                    var item = this.data[key];
                    var type = typeof item;
                    var newval = this.getValue(key, item);
                    if (type == 'boolean') {
                        item = newval == 'true';
                    }
                    this.data[key] = item;
                }
            }
        };
        Settings.prototype.saveSetting = function () {
            for (var key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                    var item = this.data[key];
                    this.setValue(key, item);
                }
            }
        };
        Settings.prototype.init = function () {
            this.initSetting();
        };
        return Settings;
    }());
    SeaColor.Settings = Settings;
})(SeaColor || (SeaColor = {}));
var seaColor_Settings = new SeaColor.Settings();
seaColor_Settings.init();
