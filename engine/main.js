
document.write('Fuuuuuuuu!!!!!!');
var body = document.getElementsByTagName('body')[0];

var heroCan = document.createElement('canvas');
heroCan.height = 600;
heroCan.width = 600;

var hero = new BullitHero(1, 200, 20);
var heroRend = new BHRenderer(hero, heroCan);

body.appendChild(heroCan);
//User input will be refactored next. It shouldn't need all these arguments.
//The bulk of the drawing work is going to be done in timers, not in the ui
//object. For now, though, it works in UserInput for the purposes of testing
//drawing on the canvas tag.

var ui = new UserInput(hero);
var bl = bulletMaker();
var blRend = new BLRenderer(bl, heroCan);

var renderers = [heroRend, blRend]

var level1 = new Level(ui, bl, renderers);

window.setInterval('level1.tick()', 50);

function bulletMaker() {
	var bulletList = new BulletList();

	var i;
	bulletList.dt = 3;

	i = bulletList.makeBullet(10, 10, 0);
	bulletList.velx[i] = 1;
	bulletList.vely[i] = 2;

	i = bulletList.makeBullet(300, 300, 0);
	bulletList.targetx[i] = 280;
	bulletList.targety[i] = 280;
	bulletList.rotvel[i] = 1;

	return bulletList;
}

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
