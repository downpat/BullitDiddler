function UserInput(bullitHero) {
	this.bullitHero = bullitHero;

	var ui = this;

	document.onkeydown = function(event) {
		var code = event.keyCode;

		switch(code) {
			case 37:
				ui.bullitHero.stepLeft();
				break;
			case 39:
				ui.bullitHero.stepRight();
				break;
			default:
				console.log('KeyCode: '+code);
		}
	}

}
