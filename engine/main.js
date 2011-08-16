

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
