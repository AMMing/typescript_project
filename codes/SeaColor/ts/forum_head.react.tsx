module SeaColor.Head {
    export class Write{
        static current:Write = new Write();
        writeItem(item:TopicItem):JSX.Element{
            return (
                <li>
                    <a href={item.link} target="_blank">
                        <i>
                            <img src={item.img} className="img1"/>
                            <img src={item.img2} className="img2"/>
                        </i>
                        <span>{item.title}</span>
                        <b className="clear"></b>
                    </a>
                </li>
            );
        }
        writeContent(content:Element):void{
            var item_list= Enumerable.From(Data.list_data)
                .Select(x=>this.writeItem(x))
                .ToArray();
                
            ReactDOM.render((
            <div className="forum_head">
                <img className="bg" src={`${Data.img_url}images/h_bg.jpg`} alt="" />
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
                        {item_list}
                        <li className="clear"></li>
                    </ul>
                </div>
                <div className="btn" id="btn_forum_head_show">
                    <div className="bg waveform"></div>
                    <div className="bg"></div>
                    <p>2016</p>
                    <i>春</i>
                </div>
            </div>
            ), content);

        }
    }
}