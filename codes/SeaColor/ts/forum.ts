module SeaColor {
    export class Forum {
        constructor() {
            let list = Enumerable.Range(0, 50).
                Where((x, i) => x / 2 == 0).
                OrderBy(x=> x);

            console.log(list);
        }
    }
}
(new SeaColor.Forum());