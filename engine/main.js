

document.write('Fuuuuuuuu!!!!!!');
var body = document.getElementsByTagName('body')[0];

var heroCan = document.createElement('canvas');
heroCan.height = 500;
heroCan.width = 500;

var hero = new BullitHero(1, 200, 20);
var heroRend = new BHRenderer(hero);

heroRend.render(heroCan);

body.appendChild(heroCan);


