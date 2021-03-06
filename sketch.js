let curves;
let rad = 10;
let spd = 0.09;

function setup() {
   createCanvas(windowWidth, windowHeight);
   background(0);
   stroke(255);
   strokeWeight(4); 
   curves = [];
   noFill();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
   let mousePos = new p5.Vector(mouseX, mouseY);
   curves.push([mousePos]);
}

function mouseDragged() {
   if (curves.length > 0) {
      let mousePos = new p5.Vector(mouseX, mouseY);
      let lastPos = curves[curves.length - 1][curves[curves.length - 1].length - 1];
      if (p5.Vector.sub(mousePos, lastPos).mag() > 2) {
         curves[curves.length - 1].push(mousePos);
      }
   }
}

function draw() {
   background(0, 2);

   if (curves.length >= 1 && !mouseIsPressed) {

      for (var i1 = 0; i1 < curves.length; ++i1) {
         for (var j1 = 0; j1 < curves[i1].length; ++j1) {
            for (var i2 = 0; i2 < curves.length; ++i2) {
               for (var j2 = 0; j2 < curves[i2].length; ++j2) {
                  if (p5.Vector.sub(curves[i1][j1], curves[i2][j2]).mag() < 2 * rad) {
                     curves[i1][j1] = curves[i1][j1].add(p5.Vector.sub(curves[i1][j1], curves[i2][j2]).setMag((2 * rad - p5.Vector.dist(curves[i1][j1], curves[i2][j2])) * spd));
                     // break;
                  }
               }
            }
         }
      }

      for (var i1 = 0; i1 < curves.length; ++i1) {
         for (var j1 = 1; j1 < curves[i1].length; ++j1) {
            if (p5.Vector.sub(curves[i1][j1], curves[i1][j1 - 1]).mag() > 2 * rad) {
               curves[i1].splice(j1, 0, p5.Vector.add(curves[i1][j1], curves[i1][j1 - 1]).mult(0.5));
               // break;
            }
         }
      }

   }

   if (curves.length >= 1) {
      for (var i = 0; i < curves.length; ++i) {
         beginShape();
         for (var j = 0; j < curves[i].length; ++j) {
            curveVertex(curves[i][j].x, curves[i][j].y);
         }
         endShape();
      }
   }

}