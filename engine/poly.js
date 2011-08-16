
var BMath = {
    iadd : function(a, b)
    {
        return [a[0]+b[0], a[1]+b[1]];
    },

    imul : function(a, b)
    {
        return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
    },

    iinv : function(a)
    {
        var m2 = a[0]*a[0]+a[1]*a[1];
        return [a[0] / m2, -a[1] / m2];
    },

    idiv : function(a, b)
    {
        return BMath.imul(a, BMath.iinv(b));
    },

    EPSILON : 0.000001,

    solveCubic_verbose : function(a, b, c, d)
    {
        print("   solveCubic("+a+", "+b+", "+c+", "+d+")");
        if (Math.abs(a) < BMath.EPSILON)
        {
            print("   solveCubic: |a| < EPSILON, delegating to solveQuadratic");
            return BMath.solveQuadratic_verbose(b, c, d);
        }
        var e = b/a, f = c/a, g = d/a;
        var e2 = e*e;
        var p = f-e2/3.0;
        var q = (2.0*e2/27.0 - f/3.0)*e+g;
        var r = 4.0*p*p*p+27.0*q*q;
        var s = 3.0*q*Math.sqrt(3.0);
        var denom = 6*Math.sqrt(3.0);
        if (r < 0.0)
        {
            print("   solveCubic: r < 0, no solutions");
            return [];
        }
        r = Math.sqrt(r);
        var t = (-s+r) / denom;
        var u = ( s+r) / denom;
        t = (t < 0) ? -Math.pow(-t, 1.0/3.0) : Math.pow(t, 1.0/3.0);
        u = (u < 0) ? -Math.pow(-u, 1.0/3.0) : Math.pow(u, 1.0/3.0);
        var y = t-u;
        var x0 = y-e/3.0;
        print("   solveCubic main case");
        print("   x0="+x0);
        return [x0].concat(BMath.solveQuadratic_verbose(1.0, (x0+e), (x0*x0+x0*e+f)));
    },

    solveCubic : function(a, b, c, d)
    {
        if (Math.abs(a) < BMath.EPSILON)
        {
            return BMath.solveQuadratic(b, c, d);
        }
        var e = b/a, f = c/a, g = d/a;
        var e2 = e*e;
        var p = f-e2/3.0;
        var q = (2.0*e2/27.0 - f/3.0)*e+g;
        var r = 4.0*p*p*p+27.0*q*q;
        var s = 3.0*q*Math.sqrt(3.0);
        var denom = 6*Math.sqrt(3.0);
        if (r < 0.0)
        {
            return [];
        }
        r = Math.sqrt(r);
        var t = (-s+r) / denom;
        var u = ( s+r) / denom;
        t = (t < 0) ? -Math.pow(-t, 1.0/3.0) : Math.pow(t, 1.0/3.0);
        u = (u < 0) ? -Math.pow(-u, 1.0/3.0) : Math.pow(u, 1.0/3.0);
        var y = t-u;
        var x0 = y-e/3.0;
        return [x0].concat(BMath.solveQuadratic(1.0, (x0+e), (x0*x0+x0*e+f)));
    },

    solveQuadratic_verbose : function(a, b, c)
    {
        if (Math.abs(a) < BMath.EPSILON)
        {
            if (Math.abs(b) < BMath.EPSILON)
            {
                print("   solveQuadratic constant case, no solutions");
                return [];
            }
            print("   solveQuadratic linear case");
            return [-c/b];
        }
        var d = b*b-4.0*a*c;
        if (d < 0.0)
        {
            print("   solveQuadratic d<0, no solutions");
            return [];
        }
        var ta = 2.0*a;
        if (Math.abs(d) < BMath.EPSILON)
        {
            print("   solveQuadratic d=0, one solution");
            return [-b/ta];
        }
        d = Math.sqrt(d);
        print("   solveQuadratic main case");
        return [(d-b)/ta, (-d-b)/ta];
    },

    solveQuadratic : function(a, b, c)
    {
        if (Math.abs(a) < BMath.EPSILON)
        {
            if (Math.abs(b) < BMath.EPSILON)
            {
                return [];
            }
            return [-c/b];
        }
        var d = b*b-4.0*a*c;
        if (d < 0.0)
        {
            return [];
        }
        var ta = 2.0*a;
        if (Math.abs(d) < BMath.EPSILON)
        {
            return [-b/ta];
        }
        d = Math.sqrt(d);
        return [(d-b)/ta, (-d-b)/ta];
    }
};
