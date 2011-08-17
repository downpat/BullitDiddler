function BHRenderer(bullitHero, canvas) {
	this.bullitHero = bullitHero;
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.render = function() {
		this.clearCanvas();
		this.context.fillStyle='#FF0000';
		this.context.fillRect(this.bullitHero.pos,200,50,50);
	}

	this.clearCanvas = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		var w = this.canvas.width;
		this.canvas.width = 1;
		this.canvas.width = w;
	}
}

