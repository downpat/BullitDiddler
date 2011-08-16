function UserInput(bullitHero) {
	this.bullitHero = bullitHero;

	document.onkeydown = function(event) {
		var code = event.keyCode;

		switch(code) {
			case 37:
				this.bullitHero.stepLeft();
				break;
			case 39:
				this.bullitHero.stepRight();
				break;
			default:
				console.log('KeyCode: '+code);
		}
	}

}
