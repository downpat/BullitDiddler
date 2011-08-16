/* Example BulletList constructor */

function BulletList(x, y, z)
{
    //global
    this.dt = 1;
    this.indextop = 0;
    
    //normalad
    this.posx = {};
    this.posy = {};
    this.velx = {};
    this.vely = {};
    this.accx = {};
    this.accy = {};

    //thrust
    this.angle = {};
    this.thrustvel = {};
    this.thrustacc = {};
    this.turnvel = {};
    this.turnacc = {};

    //rotation
    this.userad = {};
    this.targetx = {};
    this.targety = {};
    this.rotvel = {};
    this.rotacc = {};
    this.towardvel = {};
    this.towardacc = {};
    
    this.makeBullet = function(x, y, angle)
    {
        var i = this.indextop+'';
	this.posx[i] = x;
	this.posy[i] = y;
	this.velx[i] = 0;
	this.vely[i] = 0;
	this.accx[i] = 0;
	this.angle[i] = angle;
	this.thrustvel[i] = 0;
	this.thrustacc[i] = 0;
	this.turnvel[i] = 0;
	this.turnacc[i] = 0;
	this.userad[i] = false;
	this.targetx[i] = 0;
	this.targety[i] = 0;
	this.rotvel[i] = 0;
	this.rotacc[i] = 0;
	this.towardvel[i] = 0;
	this.towardacc[i] = 0;
	this.indextop++;
        return i;
    };

    this.removeBullet = function(index)
    {
	delete this.posx[index];
	delete this.posy[index];
	delete this.velx[index];
	delete this.vely[index];
	delete this.accx[index];
	delete this.angle[index];
	delete this.thrustvel[index];
	delete this.thrustacc[index];
	delete this.turnvel[index];
	delete this.turnacc[index];
	delete this.userad[index];
	delete this.targetx[index];
	delete this.targety[index];
	delete this.rotvel[index];
	delete this.rotacc[index];
	delete this.towardvel[index];
	delete this.towardacc[index];
    };

    //optimization notes:
    //throw out dt altogether
    //skip different physics types if the values will have no effect
    this.simulate = function()
    {
	var dt = this.dt;
	var d, vx, vy, radius, theta, cost, sint, dx, dy, dtor;
	for (i in this.posx)
	{
	    //basic movement
	    this.velx[i] += this.accx[i]*dt;
	    this.vely[i] += this.accy[i]*dt;
	    this.posx[i] += this.velx[i]*dt;
	    this.posy[i] += this.vely[i]*dt;

	    //thrust movement
	    this.thrustvel[i] += this.thrustacc[i]*dt;
	    d = this.thrustvel[i]*dt;
	    this.posx[i] += Math.cos(this.angle[i])*d;
	    this.posy[i] += Math.sin(this.angle[i])*d;

	    //turn physics
	    this.turnvel[i] += this.turnacc[i]*dt;
	    this.angle[i] += this.turnvel[i]*dt;
	    this.angle[i] = this.angle[i] % 6.28318531;

	    //rot physics
	    this.rotvel[i] += this.rotacc[i]*dt;
	    this.towardvel[i] += this.towardacc[i]*dt;
	    vx = this.posx[i] - this.targetx[i];
	    vy = this.posy[i] - this.targety[i];
	    radius = Math.sqrt(vx*vx + vy*vy);
	    if (this.userad)
	    {
		theta = this.rotvel[i]*dt;
	    }
	    else
	    {
		theta = (this.rotvel[i] / radius)*dt;
	    }
	    cost = Math.cos(theta);
	    sint = Math.sin(theta);
	    dx = vx*cost - vy*sint;
	    dy = vx*sint + vy*cost;
	    this.posx[i] = this.targetx[i] + dx;
	    this.posy[i] = this.targety[i] + dy;

	    //towardvel
	    dtor = dt / radius;
	    this.posx[i] += vx * this.towardvel[i] * dtor;
	    this.posy[i] += vy * this.towardvel[i] * dtor;
	}
    };
    
    return;
}

o = new BulletList();
