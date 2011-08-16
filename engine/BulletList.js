/* Example BulletList constructor */

function BulletList(x, y, z)
{
    //global
    this.dt = 1
    this.indextop = 0
    
    //normal
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
    
    
    this.f = function(a, b, c)
    {
       var local1, local2;
       do_something_useful(a, b);
       do_more_stuff(c);
       return compute_result();
    }
    return;
}

o = new BulletList();
var bulletsX = new Array();
var bulletsY = new Array();
var bulletsSpeed = new Array();
var bulletsAccel = new Array();
