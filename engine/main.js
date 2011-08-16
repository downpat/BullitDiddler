document.write('Fuuuuuuuu!!!!!!');
document.write('<script type="text/javascript" src="./engine/BullitHero.js"></script>');
document.write('<script type="text/javascript" src="./engine/BHRenderer.js"></script>');

var heroCan = document.createElement('canvas');

var hero = new BullitHero(1, 200, 20);
var heroRend = new BHRenderer(hero);

heroRend.render(heroCan);

