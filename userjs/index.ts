class Temp {
	name: string = 'aming';
	id: number = 2;
	constructor() {

	}
	init() {
		alert(this.id + this.name);
	}
}

var t = new Temp();
t.init();