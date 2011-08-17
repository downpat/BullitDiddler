function BLRenderer(bulletList, canvas) {
	this.bulletList = bulletList;
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.render = function() {
		this.clearCanvas();
		this.context.fillStyle='#00f';
		var loc_bl = this.bulletList;
		for(i in this.bulletList.posx){
			this.context.beginPath();
			this.context.arc(loc_bl.posx[i], loc_bl.posy[i], 15, 0, Math.PI*2, true);
			this.context.closePath();
		}
		this.context.fill();

	}

	this.clearCanvas = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		var w = this.canvas.width;
		this.canvas.width = 1;
		this.canvas.width = w;
	}
}
