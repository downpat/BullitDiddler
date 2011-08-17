

document.write('Fuuuuuuuu!!!!!!');
var body = document.getElementsByTagName('body')[0];

var heroCan = document.createElement('canvas');
heroCan.height = 500;
heroCan.width = 500;

var hero = new BullitHero(1, 200, 20);
var heroRend = new BHRenderer(hero);

body.appendChild(heroCan);
//User input will be refactored next. It shouldn't need all these arguments.
//The bulk of the drawing work is going to be done in timers, not in the ui
//object. For now, though, it works in UserInput for the purposes of testing
//drawing on the canvas tag.
var ui = UserInput(hero, heroRend, heroCan);

function CircleTown(x, y, radius)
{
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.PI_TIMES_2 = Math.PI * 2.0;
    this.PI_OVER_2 = Math.PI / 2.0;

    this.ray = function(mousex, mousey)
    {
	var dx = mousex - this.x;
	var dy = mousey - this.y;

	a = Math.atan2(dy, dx);
	if (a < 0)
	{
	    a += PI_TIMES_2;
	}

	var herex = (Math.cos(a) * radius) + this.x;
	var herey = (Math.sin(a) * radius) + this.y;
	
	return [this.x, this.y];
    };
}