var Temp = (function () {
    function Temp() {
        this.name = 'aming';
        this.id = 2;
    }
    Temp.prototype.init = function () {
        alert(this.id + this.name);
    };
    return Temp;
})();
var t = new Temp();
t.init();
//# sourceMappingURL=index.js.map