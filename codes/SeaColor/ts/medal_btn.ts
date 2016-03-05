module SeaColor {
    export class Medal_Global {
        createChangeButton(): void {
            let $btn = jQuery('<div></div>').
                addClass('seacolor').
                addClass('button').
                text(seaColor_Settings.data.medal ? '切换到旧版' : '切换到新版').
                click(() => {
                    seaColor_Settings.data.medal = !seaColor_Settings.data.medal;
                    seaColor_Settings.saveSetting();
                    window.location.reload();
                });
            jQuery('.tbmu:first').append($btn);
        }
        init() {
            this.createChangeButton();
        }
    }
}
(new SeaColor.Medal_Global()).init();