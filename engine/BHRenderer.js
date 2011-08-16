function BHRenderer(bullitHero) {
	this.bullitHero = bullitHero;

	this.render = function(canvas) {
		ctx=canvas.getContext('2d');
		ctx.clearRect(0,0, canvas.width, canvas.height);
		var w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
		ctx.fillStyle='#FF0000';
		ctx.fillRect(this.bullitHero.pos,200,50,50);
	}
}

