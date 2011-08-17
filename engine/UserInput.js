
//This is just a very rough start to get the movement going to begin with.
//We should probably be passing the canvas to the renderer, not here.
//In any case, this will need to be refactored next
function UserInput(bullitHero) {
	this.bullitHero = bullitHero;

	this.onkeydown = function(event) {
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
