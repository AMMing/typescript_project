module SeaColor.Head {
    export class Data {
        static img_url: string = 'http://ts.amoe.me/seacolor/';
        static list_data: Array<TopicItem> = [
            {
                img: `${Data.img_url}images/map/e1.jpg`,
                img2: `${Data.img_url}images/boss/e1.jpg`,
                title: 'E1先行攻略',
                link: '/thread-29778-1-1.html'
            },
            {
                img: `${Data.img_url}images/map/e2.jpg`,
                img2: `${Data.img_url}images/boss/e2.jpg`,
                title: 'E2先行攻略',
                link: '/thread-29779-1-1.html'
            },
            {
                img: `${Data.img_url}images/map/e3.jpg`,
                img2: `${Data.img_url}images/boss/e3.jpg`,
                title: 'E3先行攻略',
                link: '/thread-29780-1-1.html'
            },
            {
                img: `${Data.img_url}images/map/e4.jpg`,
                img2: `${Data.img_url}images/boss/e4.jpg`,
                title: 'E4先行攻略',
                link: '/thread-29781-1-1.html'
            },
            {
                img: `${Data.img_url}images/map/e5.jpg`,
                img2: `${Data.img_url}images/boss/e5.jpg`,
                title: 'E5先行攻略',
                link: '/thread-29782-1-1.html'
            },
            {
                img: `${Data.img_url}images/map/e6.jpg`,
                img2: `${Data.img_url}images/boss/e6.jpg`,
                title: 'E6先行攻略',
                link: '/thread-29783-1-1.html'
            },
            {
                img: `${Data.img_url}images/map/e7.jpg`,
                img2: `${Data.img_url}images/boss/e7.jpg`,
                title: 'E7先行攻略',
                link: '/thread-29784-1-1.html'
            }

        ];
    }
    export class AnimateItem {
        constructor(public $item: JQuery) {

        }

        auto_timer: number = 0;

        getRandom(max: number = 100): number {
            return Math.ceil(Math.random() * max);
        }

        iconChange(): void {
            var $img1 = this.$item.find('i img.img1');
            var $img2 = this.$item.find('i img.img2');
            if ($img1.hasClass('hide')) {
                $img1.removeClass('hide');
                $img2.addClass('hide');
            } else {
                $img1.addClass('hide');
                $img2.removeClass('hide');
            }
        }

        auto(): void {
            var time = this.getRandom(10000) + 2000;
            this.auto_timer = setTimeout(() => {
                this.iconChange();
                this.auto();
            }, time);
        }

        stop(): void {
            clearTimeout(this.auto_timer);
        }

        show(): void {
            this.$item.addClass('show');
            this.auto();
        }
        delayShow(time: number): void {
            setTimeout(() => this.show(), time);
        }

        hide(): void {
            this.$item.removeClass('show');
            this.stop();
        }
        delayHide(time: number): void {
            setTimeout(() => this.hide(), time);
        }

    }
    export class Animate {
        constructor(public $frame: JQuery) {
            this.initJQueryObject();
        }
        $btn: JQuery;
        $text: JQuery;
        $text_info: JQuery;
        $text_left: JQuery;
        $text_line: JQuery;
        $text_right: JQuery;
        $text_right_h1: JQuery;
        $text_right_a: JQuery;
        $topics: JQuery;
        $topics_items: Array<AnimateItem> = [];

        initJQueryObject() {
            this.$btn = this.$frame.find('.btn');
            this.$text = this.$frame.find('.text');

            this.$text_info = this.$text.find('.info');
            this.$text_left = this.$text_info.find('.left');
            this.$text_line = this.$text_info.find('.line');
            this.$text_right = this.$text_info.find('.right');

            this.$text_right_h1 = this.$text_right.find('h1');
            this.$text_right_a = this.$text_right.find('a');

            this.$topics = this.$frame.find('.topics');
            this.$topics.find('li').each((i, x) =>
                this.$topics_items.push(new AnimateItem(jQuery(x)))
            );
        }
        getItemsPlayTime(): number {
            return 100 * (this.$topics_items.length - 1) + 200;
        }
        showItems(): void {
            for (var i = 0; i < this.$topics_items.length; i++) {
                var item = this.$topics_items[i];
                item.delayShow(100 * i + 200);
            }
        }
        hideItems(): void {
            for (var i = 0; i < this.$topics_items.length; i++) {
                var item = this.$topics_items[i];
                item.delayHide(100 * (this.$topics_items.length - i - 1) + 200);
            }
        }
        menu_playing: boolean = false;
        menu_is_show: boolean = false;
        showMenu(): void {
            if (this.menu_playing || this.menu_is_show) return;
            this.menu_playing = true;

            var method = 'easeInOutQuad';
            this.$btn.animate({ right: 970 }, 800, method);

            this.$text.animate({ top: 10, height: 160 }, 800, method);

            this.$text_left.animate({
                fontSize: 18,
                left: 100,
                top: -26
            }, 800, method);
            this.$text_right.animate({
                left: -350,
                top: -10
            }, 800, method);

            this.$text_line.addClass('rotate').animate({
                left: -134,
                top: -70
            }, 800, method);

            this.$text_right_h1.animate({ fontSize: 24 }, 800, method);

            this.$text_right_a.animate({
                fontSize: 12,
                left: 24,
                top: 1
            }, 800, method);

            this.showItems();
            var time = this.getItemsPlayTime();
            setTimeout(() => AMing.Core.Helper.call_func_context(this, () => {
                this.menu_is_show = true;
                this.menu_playing = false;
            }), time);
        }
        hideMenu(): void {
            var hide_text = () => {
                if (this.menu_playing || !this.menu_is_show) return;
                this.menu_playing = true;

                var method = 'easeInOutQuad';
                this.$btn.animate({ right: 20 }, 800, method);

                this.$text.animate({ top: 40, height: 100 }, 800, method);

                this.$text_left.animate({
                    fontSize: 44,
                    left: 0,
                    top: 0
                }, 800, method);
                this.$text_right.animate({
                    left: 0,
                    top: 0
                }, 800, method);

                this.$text_line.removeClass('rotate').animate({
                    left: 0,
                    top: 0
                }, 800, method);

                this.$text_right_h1.animate({ fontSize: 36 }, 800, method);

                this.$text_right_a.animate({
                    fontSize: 16,
                    left: 0,
                    top: 0
                }, 800, method, () => {
                    this.menu_is_show = false;
                    this.menu_playing = false;
                });
            }

            this.hideItems();
            var time = this.getItemsPlayTime();
            setTimeout(() => AMing.Core.Helper.call_func_context(this, hide_text), time);
        }
        showHide(): void {
            if (this.menu_is_show) {
                this.hideMenu();
            } else {
                this.showMenu();
            }
        }
    }
    export interface TopicItem {
        title: string,
        img: string,
        img2: string,
        link: string
    }
}

var animate;
function showAnimate() {
    var $content = jQuery('.t9_1505190828');
    $content.animate({ opacity: 0 }, 400, () => {
        SeaColor.Head.Write.current.writeContent($content[0]);
        animate = new SeaColor.Head.Animate($content);
        $content.animate({ opacity: 1 }, 400);
        jQuery('#btn_forum_head_show').click(e => {
            animate.showHide();
        });
    });
}

showAnimate();