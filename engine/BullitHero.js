function BullitHero(path, pos, speed) {

	this.path = path;
	this.pos = pos;
	this.speed = speed;

	this.move = function(amount) {
		this.pos += amount * speed;
	}

	this.stepLeft = function() {
		this.move(-1);
	}

	this.stepRight = function() {
		this.move(1);
	}
}
