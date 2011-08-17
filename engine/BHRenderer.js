function BHRenderer(bullitHero, canvas) {
	this.bullitHero = bullitHero;
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.render = function() {
		this.context.fillStyle='#f00';
		this.context.fillRect(this.bullitHero.pos,200,50,50);
	}
}

