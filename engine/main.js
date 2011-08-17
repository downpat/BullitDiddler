
document.write('Fuuuuuuuu!!!!!!');
var body = document.getElementsByTagName('body')[0];

var heroCan = document.createElement('canvas');
heroCan.height = 600;
heroCan.width = 600;


var hero = new BullitHero(1, 200, 20);
var heroRend = new BHRenderer(hero, heroCan);

var ui = new UserInput(hero);
var bl = bulletMaker();
var blRend = new BLRenderer(bl, heroCan);

heroRend.render();

var renderers = [heroRend, blRend];

var level1 = new Level(ui, bl, heroCan, renderers);

body.appendChild(heroCan);

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
