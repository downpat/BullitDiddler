function Level(userInput, bulletList, canvas, renderables) {
	this.userInput = userInput;
	this.bulletList = bulletList;
	this.renderables = renderables;
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.tick = function() {
		this.bulletList.simulate();
		this.clearCanvas();
		for(i in this.renderables) {
			this.renderables[i].render();
		}
	}

	this.clearCanvas = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		var w = this.canvas.width;
		this.canvas.width = 1;
		this.canvas.width = w;
	}
}
