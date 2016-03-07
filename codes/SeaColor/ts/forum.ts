module SeaColor {
    /**
     * 用户信息
     */
    interface User {
        id?: number;
        name: string;
        icon?: string;
    }
    /**
     * 帖子信息
     */
    interface Topic {
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
    /**
     * 论坛列表
     */
    export class Forum {
        constructor() {
            let topic_list = this.getAllNewItem();
            topic_list.forEach(x=> console.log(x));
        }
        getUserInfo($item: JQuery): User {
            return {
                name: $item.find('a').text()
            };
        }
        getTopic($item: JQuery): Topic {
            let $title = $item.find('a.s.xst');
            let $last_comment = $item.find('.by:last a');
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
            }
            return topic;
        }

        getNewItem($item: JQuery): Topic {
            return this.getTopic($item);
        }
        getAllItem(): JQuery {
            return jQuery('#threadlisttableid tbody');
        }
        getAllNewItem(): Topic[] {
            let $items = this.getAllItem();
            return $items.toEnumerable().
                Select(x=> this.getNewItem(x)).
                ToArray();
        }
    }
}
(new SeaColor.Forum());