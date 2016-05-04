module SeaColor.Head {
    // export class getData {
    //     frame_size: { w: number, h: number } = { w: 1098, h: 181 };
    //     slider_list: Array<{
    //         img: string,
    //         title1: string,
    //         title2: string,
    //         des: string,
    //         url: string
    //     }> = [];
    // }
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

        initJQueryObject() {
            this.$btn = this.$frame.find('.btn');
            this.$text = this.$frame.find('.text');

            this.$text_info = this.$text.find('.info');
            this.$text_left = this.$text_info.find('.left');
            this.$text_line = this.$text_info.find('.line');
            this.$text_right = this.$text_info.find('.right');

            this.$text_right_h1 = this.$text_right.find('h1');
            this.$text_right_a = this.$text_right.find('a');
        }
        showMenu(callback:()=>any): void {
            var method ='easeInOutQuad';
            this.$btn.animate({ right: 970 }, 800,method);

            this.$text.animate({ top: 10, height: 160 }, 800,method);

            this.$text_left.animate({
                fontSize: 18,
                left: 100,
                top: -26
            }, 800,method);
            this.$text_right.animate({
                left: -350,
                top: -10
            }, 800,method);

            this.$text_line.addClass('rotate').animate({
                left: -134,
                top: -70
            }, 800,method);

            this.$text_right_h1.animate({ fontSize: 24 }, 800,method);

            this.$text_right_a.animate({
                fontSize: 12,
                left: 24,
                top: 1
            }, 800,method,callback);
        }
    }
}

var animate;
function showAnimate(){
    var img_url ='http://ts.amoe.me/seacolor/';
    ReactDOM.render((
    <div className="forum_head">
        <img className="bg" src={`${img_url}images/h_bg.jpg`} alt="" />
        <div className="text">
            <div className="bg">
            </div>
            <div className="info">
                <div className="left">
                    総力戰
                </div>
                <div className="line">
                </div>
                <div className="right">
                    <h1>海色镇守府</h1>
                    <a href="http://kancolle.aemedia.org/">http://kancolle.aemedia.org/</a>
                </div>
                <div className="clear"></div>
            </div>
        </div>
        <div className="topics">
            <ul>
                <li className="space"></li>
                <li>
                   <a href="#">
                    <i>
                        <img src="http://kancolle.aemedia.org/uc_server/data/avatar/000/02/40/15_avatar_big.jpg" alt=""/>
                    </i>
                    <span>啊实打实大苏打上啊实打实大苏打</span>
                    <b className="clear"></b>
                   </a>
                </li>
                <li>
                   <a href="#">
                    <i>
                        <img src="http://kancolle.aemedia.org/uc_server/data/avatar/000/02/40/15_avatar_big.jpg" alt=""/>
                    </i>
                    <span>啊实啊实打实大苏打</span>
                    <b className="clear"></b>
                   </a>
                </li>
                <li>
                   <a href="#">
                    <i>
                        <img src="http://kancolle.aemedia.org/uc_server/data/avatar/000/02/40/15_avatar_big.jpg" alt=""/>
                    </i>
                    <span>啊实打实大上啊实打实大苏打</span>
                    <b className="clear"></b>
                   </a>
                </li>
                <li>
                   <a href="#">
                    <i>
                        <img src="http://kancolle.aemedia.org/uc_server/data/avatar/000/02/40/15_avatar_big.jpg" alt=""/>
                    </i>
                    <span>啊实打实打实大苏打</span>
                    <b className="clear"></b>
                   </a>
                </li>
                <li>
                   <a href="#">
                    <i>
                        <img src="http://kancolle.aemedia.org/uc_server/data/avatar/000/02/40/15_avatar_big.jpg" alt=""/>
                    </i>
                    <span>啊实打实苏打上啊苏打</span>
                    <b className="clear"></b>
                   </a>
                </li>
                <li className="clear"></li>
            </ul>
        </div>
        <div className="btn" id="btn_forum_head_show">
            <div className="bg show"></div>
            <div className="bg"></div>
            <p>2016</p>
            <i>春</i>
        </div>
    </div>
    ), document.getElementsByClassName('t9_1505190828')[0]);


    animate = new SeaColor.Head.Animate(jQuery('.t9_1505190828'));

    jQuery('#btn_forum_head_show').click(e=>{
        animate.showMenu();
        
        jQuery('.topics li').each((i,x)=>{
            // var $x= jQuery(x);
            setTimeout(()=>{
                //  $x.animate({ left: 0 }, 800);
                jQuery(x).addClass('show');
            },200*i+200);
        });
    });
    
}

showAnimate();