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
            let val = jQuery.cookie(`${this.cookie_key}_${key}`);
            if (val == null) {
                return default_val;
            }

            return val;
        }
        setValue(key: string, value: string): void {
            jQuery.cookie(`${this.cookie_key}_${key}`, value, { expires: 999 });
        }

        initSetting(): void {
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                    let item = this.data[key];
                    let type = typeof item;
                    let newval = this.getValue(key, item);
                    if (type == 'boolean') {
                        item = newval == 'true';
                    }

                    this.data[key] = item;
                }
            }
        }
        saveSetting(): void {
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key)) {
                    let item = this.data[key];
                    this.setValue(key, item);
                }
            }
        }
        init(): void {
            this.initSetting();
        }
    }
}
let seaColor_Settings = new SeaColor.Settings();
seaColor_Settings.init();