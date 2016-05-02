module SeaColor.Discuss {
    /**
     * 用户信息
     */
    export interface User {
        id: number;
        name: string;
    }
    /**
     * 帖子信息
     */
    export interface Topic {
        title: string;
        des: string;
        comment_count: number;
        view_count: number;
        date?: string;
        date_text: string;
        host: User;
        url: string;
        last_view?: User;
        is_hot?: boolean;
        is_top?: boolean;
        title_color?: string;
        last_comment_url?: string;
    }

    export class Data {
        public getUserIcon(user: User, size: string): string {
            let id = user.id;
            let id_3 = (id % 100).padLeft(2, '0');
            id = Math.floor(id / 100);
            let id_2 = (id % 100).padLeft(2, '0');
            id = Math.floor(id / 100);
            let id_1 = (id % 100).padLeft(2, '0');
            return `/uc_server/data/avatar/000/${id_1}/${id_2}/${id_3}_avatar_${size}.jpg`;
        }
        public getUserIcon_Small(user: User): string {
            return this.getUserIcon(user, 'small');
        }
        public getUserIcon_Middle(user: User): string {
            return this.getUserIcon(user, 'middle');
        }
        public getUserIcon_Big(user: User): string {
            return this.getUserIcon(user, 'big');
        }
        private getUserInfo($item: JQuery): User {
            let $a = $item.find('a');
            let url = $a.attr('href');
            let idstr = '';
            let index = url.indexOf('space-uid-')
            if (index >= 0) {
                idstr = url.substring(index + 'space-uid-'.length);
                index = idstr.indexOf('.html')
                idstr = idstr.substring(0, index);
            }
            return {
                id: parseInt(idstr),
                name: $a.text()
            };
        }
        private getTopic($item: JQuery): Topic {
            let $title = $item.find('a.s.xst');
            let $last_comment = $item.find('.by:last em a');
            let topic: Topic = {
                comment_count: parseInt($item.find('em.t9_01').text()),
                view_count: parseInt($item.find('em.t9_02').text()),
                title: $title.text().trim(),
                url: $title.attr('href'),
                title_color: $title.css('color'),
                des: $item.find('.common div:last').html(),
                host: this.getUserInfo($item.find('.by:first cite:first')),
                last_view: this.getUserInfo($item.find('.by:first cite:last')),
                date: $last_comment.find('span').attr('title'),
                date_text: $last_comment.text(),
                last_comment_url: $last_comment.attr('href')
            };
            if (!topic.date) {
                topic.date = topic.date_text;
                topic.date_text = null;
            }
            return topic;
        }

        private getTopicItem($item: JQuery): Topic {
            return this.getTopic($item);
        }
        private getAllItem(): JQuery {
            return jQuery('#threadlisttableid tbody');
        }
        public getAllTopicItem(): Array<Topic> {
            let $items = this.getAllItem();
            return $items.toEnumerable().
                Select(x => this.getTopicItem(x)).
                ToArray();
        }
    }
}

module SeaColor.Discuss {
    export class Render {
        data: Data = new Data();
        topic_list: Array<Topic> = [];
        default_img_url: string = 'http://kancolle.aemedia.org/uc_server/images/noavatar_middle.gif';
        imgLoad(e: Event) {
            var img = e.currentTarget as HTMLImageElement;
            var tempimg = new Image();
            var src = img.dataset['src'];
            var complete = () => {
                // img.src = src
                img.parentElement.style.backgroundImage = `url(${src})`;
                img.remove();
            };
            tempimg.onload = complete;
            tempimg.src = src;
            if (tempimg.complete) {
                complete();
            }
        }

        createItem(topic: Topic): JSX.Element {
            if (!topic || !topic.title || !topic.url) {
                return null;
            }

            return (
                <div className="item">
                    <div className="left">
                        <div className="bg"></div>
                        <h4>
                            <a href={topic.url}>{topic.title}</a>
                        </h4>
                        <div>{topic.des}</div>
                    </div>
                    <div className="right">
                        <div className="user">
                            <img src={this.default_img_url} data-src={this.data.getUserIcon_Middle(topic.host) } alt={topic.host.name} onLoad={this.imgLoad} />
                        </div>
                        <div className="username">{topic.host.name}</div>
                    </div>
                    <div className="clear"></div>
                </div>
            );
        }

        createList(list: Array<Topic>): JSX.Element {
            var items = Enumerable.From(list).
                Select(x => this.createItem(x)).
                Where(x => !!x).
                ToArray();

            return (
                <div className="topic_list">
                    {items}
                </div>
            );
        }
        rebuild(): void {
            while (document.body.hasChildNodes()) {
                document.body.removeChild(document.body.firstChild);
            }
            var div_root = document.createElement('div');
            document.body.appendChild(div_root);
            ReactDOM.render((
                <div className="main_content forum">
                    {this.createList(this.topic_list) }
                </div>
            ), div_root);
        }
        init(): void {
            this.topic_list = this.data.getAllTopicItem();
            this.rebuild();
        }
    }

}
(new SeaColor.Discuss.Render()).init();