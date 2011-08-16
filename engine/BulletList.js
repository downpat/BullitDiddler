/* Example BulletList constructor */

function BulletList(x, y, z)
{
    //global
    this.dt = 1
    this.indextop = 0
    
    //normalad
    this.posx = {}
    this.posy = {}
    this.velx = {}
    this.vely = {}
    this.accx = {}
    this.accy = {}

    //thrust
    this.angle = {}
    this.thrustvel = {}
    this.thrustacc = {}
    this.turnvel = {}
    this.turnacc = {}

    //rotation
    this.userad = {}
    this.targetx = {}
    this.targety = {}
    this.rotvel = {}
    this.rotacc = {}
    this.towardvel = {}
    this.towardacc = {}
    
    
    this.f = makeBullet(x, y, angle)
    {
        var i = this.indextop+''
	this.posx[i] = x
	this.posy[i] = y
	this.velx[i] = 0
	this.vely[i] = 0
	this.accx[i] = 0
	this.angle[i] = angle
	this.thrustvel[i] = 0
	this.thrustacc[i] = 0
	this.turnvel[i] = 0
	this.turnacc[i] = 0
	this.userad[i] = false
	this.targetx[i] = 0
	this.targety[i] = 0
	this.rotvel[i] = 0
	this.rotacc[i] = 0
	this.towardvel[i] = 0
	this.towardacc[i] = 0
	this.indextop++
        return i
    }

    this.f = removeBullet(index)
    {
	delete this.posx[index]
	delete this.posy[index]
	delete this.velx[index]
	delete this.vely[index]
	delete this.accx[index]
	delete this.angle[index]
	delete this.thrustvel[index]
	delete this.thrustacc[index]
	delete this.turnvel[index]
	delete this.turnacc[index]
	delete this.userad[index]
	delete this.targetx[index]
	delete this.targety[index]
	delete this.rotvel[index]
	delete this.rotacc[index]
	delete this.towardvel[index]
	delete this.towardacc[index]
    }
    return;
}

o = new BulletList();
var bulletsX = new Array();
var bulletsY = new Array();
var bulletsSpeed = new Array();
var bulletsAccel = new Array();
