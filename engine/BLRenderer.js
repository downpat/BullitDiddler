function BLRenderer(bulletList, canvas) {
	this.bulletList = bulletList;
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.render = function() {
		this.context.fillStyle='#00f';
		var loc_bl = this.bulletList;
		for(i in this.bulletList.posx){
			this.context.beginPath();
			this.context.arc(loc_bl.posx[i], loc_bl.posy[i], 15, 0, Math.PI*2, true);
			this.context.closePath();
			this.context.fill();
		}
	}
}
