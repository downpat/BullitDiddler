
// This file is only meant to be run from Rhino.

load("poly.js");

testc = [-2, -1, -0.5, 0, 0.5, 1, 2,
/* random values generated in Python
r = random.Random(1337)
print ",\n".join(str(r.uniform(-10, 10)) for i in xrange(10))
*/
2.35505713903,
0.6653114721,
-2.68303281501,
1.71574707805,
-6.68625432622,
6.48747493815,
-2.32590382772,
5.79225649831,
8.43453019793,
-3.84733224041
];

for(var ia=0;ia<testc.length;ia++)
{
   var a = testc[ia];
   for(var ib=0;ib<testc.length;ib++)
   {
      var b = testc[ib];
      for(var ic=0;ic<testc.length;ic++)
      {
         var c = testc[ic];
         for(var id=0;id<testc.length;id++)
         {
            var d = testc[id];
            u = BMath.solveCubic(a, b, c, d);
            for(var ix=0;ix<u.length;ix++)
            {
               var x = u[ix];
               var y = ((a*x+b)*x+c)*x+d;
               
               if (Math.abs(y) >= 0.000001)
               {
                  print("Error with params "+a+", "+b+", "+c+", "+d);
                  print("   x="+x+"   y="+y);
                  BMath.solveCubic_verbose(a, b, c, d);
               }
            }
            
         }
      }
   }
}

print(BMath.solveCubic(3, 4, 5, 6));

