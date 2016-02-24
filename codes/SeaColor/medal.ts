module SeaColor {
    /**
     * 勋章分类
     */
    export interface MedalCate {
        id: number;
        /**
         * 分级分类ID，0为顶级分类
         */
        parent_id: number;
        /**
         * 分类名
         */
        name: string;
        /**
         * 用于辨别勋章分类的关键词
         */
        key: string;
        child?: MedalCate[];
    }
    /**
     * 勋章页分类
     */
    export class Medal {
        cate: MedalCate[] = [
            {
                id: 1,
                parent_id: 0,
                name: '发放中',
                key: '发放中'
            }, {
                id: 2,
                parent_id: 0,
                name: '绝版',
                key: '绝版'
            }, {
                id: 3,
                parent_id: 1,
                name: '真爱',
                key: '真爱'
            }, {
                id: 4,
                parent_id: 2,
                name: '真爱',
                key: '真爱'
            }
        ];
        /**
         * 分类的最小级数
         */
        cate_level: number = 3;
        init() {
        }
    }
}
(new SeaColor.Medal()).init();