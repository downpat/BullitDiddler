function BHRenderer(bullitHero) {
	this.bullitHero = bullitHero;

	this.render = function(canvas) {
		ctx=canvas.getContext('2d');
		ctx.fillStyle='#FF0000';
		ctx.fillRect(this.bullitHero.pos,200,50,50);
	}
}

