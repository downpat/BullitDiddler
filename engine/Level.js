var userInput;
var bulletList = new BulletList();

var i;
bulletList.dt = 1;

i = bulletList.makeBullet(10, 10, 0);
bulletList.velx[i] = 1;
bulletList.vely[i] = 2;

i = bulletList.makeBullet(300, 300, 0);
bulletList.targetx[i] = 280;
bulletList.targety[i] = 280;
bulletList.rotvel[i] = 1;
