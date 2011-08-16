function BHRenderer(bullitHero) {
	this.bullitHero = bullitHero;

	this.render = function(canvas) {
		tx=canvas.getContext('2d');
		ctx.fillStyle='#FF0000';
		ctx.fillRect(0,0,80,100);
	}
}

