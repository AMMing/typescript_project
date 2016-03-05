module SeaColor {
    export interface VersionSetting {
        medal: boolean
    }
    export class Version {
        setting: { medal: boolean } = {
            medal: true
        };
        cookie_key: string = 'SeaColor.Setting';

        initSetting(): void {
            var data = jQuery.cookie(this.cookie_key);
            debugger;
        }
        saveSetting(): void {
            jQuery.cookie(this.cookie_key, this.setting);
        }
        init(): void {
            this.initSetting();
            this.saveSetting();
        }
    }
}