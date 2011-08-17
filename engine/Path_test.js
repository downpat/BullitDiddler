
load("poly.js");
load("Path.js");

path = [
   [PathUtil.SEG_LINEAR, 3, 4, 8, 8],
   [PathUtil.SEG_QUAD, 1, 5, 7, 7, 15, 3],
   [PathUtil.SEG_CUBIC, 5, 7, 1, 3, -5, -5, 12, 10]
   ];

ppath = PathUtil.precomp(path);

PathUtil.intersect_ray_first(ppath,
   [2, 2, 7, 10],
   [0, 1, 0, Infinity]
   );

