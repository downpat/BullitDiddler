
PathUtil =
{
   SEG_LINEAR : 0,           /* 2 points:   [SEG_LINEAR , x0, y0, x1, y1] */
   SEG_QUAD : 1,             /* 3 points:   [SEG_QUAD   , x0, y0, x1, y1, x2, y2] */
   SEG_CUBIC : 2,            /* 4 points:   [SEG_CUBIC  , x0, y0, x1, y1, x2, y2, x3, y3] */

   _bezier2coeff : {},

   EPSILON : 0.000001,

   _intersect_line_ray : function(a0, a1, b0, b1, x0, y0, dx, dy)
   {
      /* a0+a1*s = x0+dx*t
         b0+b1*s = y0+dy*t
         [-a1 dx][s] = [a0-x0]
         [-b1 dy][t]   [b0-y0]

         I = [ dy -dx] / (b1*dx-a1*dy)
             [-dx -a1]
      */
      var det = b1*dx-a1*dy;
      if (Math.abs(det) < PathUtil.EPSILON)
         return [];
      var a0_x0 = a0-x0, y0_b0 = y0-b0;
      return [[(dx*y0_b0 + dy*a0_x0)/det,
               (b1*a0_x0 + a1*y0_b0)/det]];
   },

   _intersect_quad_ray : function(a0, a1, a2, b0, b1, b2, x0, y0, dx, dy)
   {
      /* a0+a1*s+a2*s^2 = x0+dx*t
         b0+b1*s+b2*s^2 = y0+dy*t
         ((a0-x0) / dx - (b0-y0) / dy) + (a1/dx - b1/dy)*s + (a2/dx - b2/dy)*s^2 */
      var a0_x0_dx = (a0-x0)/dx,
          b0_y0_dy = (b0-y0)/dy,
          a1_dx = a1/dx,
          b1_dy = b1/dy,
          a2_dx = a2/dx,
          b2_dy = b2/dy;
      var sv = BMath.solveQuadratic(a2_dx - b2_dy, a1_dx - b1_dy, a0_x0_dx - b0_y0_dy);
      var result = [];
      for(var i=0;i<sv.length;i++)
      {
         var s = sv[i];
         result.push([s, (a2_dx*s+a1_dx)*s+a0_x0_dx]);
      }
      return result;
   },

   _intersect_cubic_ray : function(a0, a1, a2, a3, b0, b1, b2, b3, x0, y0, dx, dy)
   {
      /* a0+a1*s+a2*s^2+a3*s^3 = x0+dx*t
         b0+b1*s+b2*s^2+b3*s^3 = y0+dy*t
         ((a0-x0) / dx - (b0-y0) / dy) + (a1/dx - b1/dy)*s + (a2/dx - b2/dy)*s^2 + (a3/dx - b3/dy)*s^3 */
      var a0_x0_dx = (a0-x0)/dx,
          b0_y0_dy = (b0-y0)/dy,
          a1_dx = a1/dx,
          b1_dy = b1/dy,
          a2_dx = a2/dx,
          b2_dy = b2/dy,
          a3_dx = a3/dx,
          b3_dy = b3/dy;
      var sv = BMath.solveCubic(a3_dx - b3_dy, a2_dx - b2_dy, a1_dx - b1_dy, a0_x0_dx - b0_y0_dy);
      var result = [];
      for(var i=0;i<sv.length;i++)
      {
         var s = sv[i];
         result.push([s, ((a3_dx*s+a2_dx)*s+a1_dx)*s+a0_x0_dx]);
      }
      return result;
   },

   _init : function()
   {
      PathUtil._bezier2coeff[PathUtil.SEG_LINEAR] = function(u) { return [
         u[1], u[3]-u[1],
         u[2], u[4]-u[2]]; };
      PathUtil._bezier2coeff[PathUtil.SEG_QUAD  ] = function(u) { return [
         u[1], 2*(u[3]-u[1]), u[5]-2*u[3]+u[1],
         u[2], 2*(u[4]-u[2]), u[6]-2*u[4]+u[2]]; };
      PathUtil._bezier2coeff[PathUtil.SEG_CUBIC ] = function(u) { return [
         u[1], 3*(u[3]-u[1]), 3*(u[5]-2*u[3]+u[1]), u[7]-3*u[5]+3*u[3]-u[1],
         u[2], 3*(u[4]-u[2]), 3*(u[6]-2*u[4]+u[2]), u[8]-3*u[6]+3*u[4]-u[2]]; };
      return;
   },

   _rot45 : function(u)
   {
      var result = new Array();
      var s2o2 = 0.5*Math.sqrt(2.0);
      result[0] = u[0];
      for(var i=1;i<u.length;i+=2)
      {
         result.push(u[i]*s2o2-u[i+1]*s2o2);
         result.push(u[i]*s2o2+u[i+1]*s2o2);
      }
      return result;
   },

   precomp_seg : function(u)
   {
      /* Takes as input a segment u of the format [SEG_LINEAR | SEG_QUAD | SEG_CUBIC, x0, y0, x1, y1, ...]
         Compute [u, coeff(u), coeff_rot45(u)]

         coeff forms:
             [SEG_LINEAR , a0, a1, b0, b1]
             [SEG_QUAD   , a0, a1, a2, b0, b1, b2]
             [SEG_CUBIC  , a0, a1, a2, a3, b0, b1, b2, b3]
      */
      var f = PathUtil._bezier2coeff[u[0]];
      return [u, f(u), f(PathUtil._rot45(u))];
   },

   precomp : function(segments)
   {
      /* [precomp(u) for u in segments] */
      var result = new Array();
      for(var i=0;i<segments.length;i++)
      {
         result.push(PathUtil.precomp_seg(segments[i]));
      }
      return result;
   },

   intersect_seg_ray : function(u, ray, bounds)
   {
      /*
      The main driver for mouse control.

      u : A path segment, preprocessed by precomp.
      ray : A ray, of the form [x0, y0, dx, dy]
      bounds : Parameter bounds for curve and path segment, format [smin, smax, tmin, tmax]
      */
      var x0 = ray[0], y0 = ray[1], dx = ray[2], dy = ray[3];
      var d = dx*dx+dy*dy;
      if (d < PathUtil.EPSILON)
         return [];
      var stv;
      var v;
      var t = u[0][0];
      if (t == PathUtil.SEG_LINEAR)
      {
         v = u[1];
         stv = PathUtil._intersect_line_ray(v[1], v[2], v[3], v[4], x0, y0, dx, dy);
      }
      else
      {
         d = Math.sqrt(d);
         rotated = true;
         if (Math.min(dx/d, dy/d) < 0.3826834323650898)
         {
            rx0y0 = _rot45([x0, y0]);
            rx0 = rx0y0[0];
            ry0 = rx0y0[1];
            rdxdy = _rot45([dx, dy]);
            rdx = rdxdy[0];
            rdy = rdxdy[1];
            v = u[2];
         }
         else
         {
            rx0 = x0;
            ry0 = y0;
            rdx = dx;
            rdy = dy;
            v = u[1];
         }
         
         if (t == PathUtil.SEG_QUAD)
            stv = PathUtil._intersect_quad_ray(v[1], v[2], v[3], v[4], v[5], v[6], rx0, ry0, rdx, rdy);
         else if (t == PathUtil.SEG_CUBIC)
            stv = PathUtil._intersect_cubic_ray(v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], rx0, ry0, rdx, rdy);
         else
            print("Undefined type "+t);
      }
      /* filter based on parameter values */
      /* 0 < s < 1, 0 < t < 1 */
      var result = new Array();
      var s0 = bounds[0][0], s1 = bounds[0][1], t0 = bounds[1][0], t1 = bounds[1][1];
      for(var i=0;i<stv.length;i++)
      {
         var st = stv[i];
         var s = st[0], t = st[1];
         if ((s0 <= s) && (s <= s1) && (t0 <= t) && (t <= t1))
         {
            result.push([s,t,x0+dx*t,y0+dy*t]);
         }
      }
      return result;
   },

   intersect_ray_first : function(segments, ray, bounds)
   {
      /* Return [s, t, curve] which minimizes t
         or null if no intersection */
      var t_best = Infinity;
      var stxy_best = null;
      for(var i=0;i<segments.length;i++)
      {
         stxyv = PathUtil.intersect_seg_ray(segments[i], ray, bounds);
         for(var j=0;j<stxyv.length;j++)
         {
            var stxy = stxyv[j];
            var t = stxy[1];
            if (t < t_best)
            {
               t_best = t;
               stxy_best = stxy;
            }
         }
      }
      return stxy_best;
   }
};

PathUtil._init();

