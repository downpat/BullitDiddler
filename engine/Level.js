function Level(userInput, bulletList, renderables) {
	this.userInput = userInput;
	this.bulletList = bulletList;

	this.tick = function() {
		this.bulletList.simulate();
		for(i in renderables) {
			renderables[i].render();
		}
	}
}
