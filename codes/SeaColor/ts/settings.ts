module SeaColor {
    export interface VersionSetting {
        /**
         * 启用新版勋章
         */
        medal: boolean
    }
    export class Settings {
        data: VersionSetting = {
            medal: true
        };
        cookie_key: string = 'SeaColor.Settings';
        getValue(key: string, default_val: string): string {
            var val = jQuery.cookie(`${this.cookie_key}_${key}`);
            if (val == null) {
                return default_val;
            }

            return val;
        }
        setValue(key: string, value: string): void {
            jQuery.cookie(`${this.cookie_key}_${key}`, value);
        }

        initSetting(): void {
            for (var key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                    var item = this.data[key];
                    this.data[key] = this.getValue(key, item);
                }
            }
        }
        saveSetting(): void {
            for (var key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                    var item = this.data[key];
                    this.setValue(key, item);
                }
            }
        }
        init(): void {
            this.initSetting();
        }
    }
}
var seaColor_Settings = new SeaColor.Settings();
seaColor_Settings.init();