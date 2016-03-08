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
     * 论坛列表数据
     */
    export class ForumData {
        private getUserInfo($item: JQuery): User {
            return {
                name: $item.find('a').text()
            };
        }
        private getTopic($item: JQuery): Topic {
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

    export class Forum {
        data: ForumData = new ForumData();
        topic_list: Array<Topic> = [];

        createItem(topic: Topic): JQuery {
            if (!topic || !topic.title || !topic.url) {
                return null;
            }

            return Helper.createElement('div', 'item').
                append(Helper.createElement('div', 'left').
                    append(Helper.createElement('div', 'bg')).//背景
                    append(Helper.createElement('h4').//标题
                        append(Helper.createLink(topic.url, topic.title))
                    ).
                    append(Helper.createElement('h5').//内容
                        append(Helper.createLink(topic.url, topic.des))
                    )
                ).
                append(Helper.createElement('div', 'right').
                    append(Helper.createElement('div', 'info').//信息
                        append(Helper.createElement('div', 'count').//查看数
                            append(Helper.createElement('p', 'view').text(topic.view_count)).
                            append(Helper.createElement('p', 'comment').text(topic.comment_count))
                        ).
                        append(Helper.createElement('div', 'date').//时间
                            append(Helper.createElement('p').text(topic.date)).
                            append(Helper.createElement('p').text(topic.date_text))
                        )
                    ).
                    append(Helper.createElement('div', 'user').//楼主信息
                        append(Helper.createImage(topic.host.icon)).
                        append(Helper.createElement('div').text(topic.host.name))
                    )
                );
        }
        createList(list: Array<Topic>): JQuery {
            return Helper.createElement('div', 'topic_list').
                append(Enumerable.From(list).
                    Select(x => this.createItem(x)).
                    Where(x => !!x).
                    TojQuery()
                );
        }
        rebuild(): void {
            let $body = jQuery('body');
            $body.empty().append(
                Helper.createElement('div', 'main_content', 'forum').
                    append(this.createList(this.topic_list))//添加列表
            );
        }
        init(): void {
            this.topic_list = this.data.getAllTopicItem();
            this.rebuild();
        }
    }
}
(new SeaColor.Forum());