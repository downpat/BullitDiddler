/* Example BulletList constructor */

function BulletList(x, y, z)
{
   this.x = x;
   this.y = y;
   this.z = z;
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
