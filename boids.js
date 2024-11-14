let flock;
  let frameCount = 0;
  const colorChangeInterval = 600;

  function runOceanAmbiance() {
    const canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.classList.add('visible');
    setup();
  }

  function setup() {
    let canvas = createCanvas(1200, 650);
    canvas.parent('canvasContainer');
    flock = new Flock();
    for (let i = 0; i < 100; i++) {
      let b = new Boid(width / 2, height / 2);
      flock.addBoid(b);
    }
    frameCount = 0;

          // canvas.mousePressed(() => {
          //   let b = new Boid(mouseX, mouseY);
          //   flock.addBoid(b);
          // });
        }
        function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}
        function draw() {
          background(51, 51, 51, 50);
          let startColor, endColor;

          if (frameCount < colorChangeInterval) {
            startColor = color(0, 0, 255);
            endColor = color(0, 255, 0);
          } else if (frameCount < colorChangeInterval * 2) {
            startColor = color(0, 255, 0);
            endColor = color(0, 0, 255);
          } else {
            startColor = color(0, 0, 255);
            endColor = color(0, 255, 0);
            frameCount = 0;
          }

          let lerpedColor = lerpColor(startColor, endColor, (frameCount % colorChangeInterval) / colorChangeInterval);
          flock.setBoidColor(lerpedColor);

          flock.run();
          frameCount++;
        }

        class Flock {
          constructor() {
            this.boids = [];
          }
          run() {
            for (let boid of this.boids) {
              boid.run(this.boids);
            }
          }
          addBoid(b) {
            this.boids.push(b);
          }
          setBoidColor(color) {
            for (let boid of this.boids) {
              boid.boidColor = color;
            }
          }
        }

        class Boid {
          constructor(x, y) {
            this.position = createVector(x, y);
            this.velocity = p5.Vector.random2D();
            this.velocity.setMag(random(2, 4));
            this.acceleration = createVector();
            this.boidColor = color(255);
            this.maxForce = 0.05;
            this.maxSpeed = 3;
            this.trail = [];
            this.trailLength = 10;
          }

          run(boids) {
            this.flock(boids);
            this.update();
            this.borders();
            this.render();
          }

          applyForce(force) {
            this.acceleration.add(force);
          }

          flock(boids) {
            let separation = this.separate(boids);
            let alignment = this.align(boids);
            let cohesion = this.cohesion(boids);
            separation.mult(1.5);
            alignment.mult(1.0);
            cohesion.mult(1.0);
            this.applyForce(separation);
            this.applyForce(alignment);
            this.applyForce(cohesion);
          }

          update() {
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);

            this.trail.push(this.position.copy());
            if (this.trail.length > this.trailLength) {
              this.trail.shift();
            }
          }

          borders() {
            if (this.position.x < 0) this.position.x = width;
            if (this.position.y < 0) this.position.y = height;
            if (this.position.x > width) this.position.x = 0;
            if (this.position.y > height) this.position.y = 0;
          }

          render() {
            noStroke();
            for (let i = 0; i < this.trail.length; i++) {
              let alpha = map(i, 0, this.trail.length, 0, 255);
              fill(this.boidColor.levels[0], this.boidColor.levels[1], this.boidColor.levels[2], alpha);
              let pos = this.trail[i];
              ellipse(pos.x, pos.y, 6, 6);
              ellipse(pos.x, pos.y, 6, 24);
            }
            fill(this.boidColor);
            ellipse(this.position.x, this.position.y, 8, 8);
          }

          separate(boids) {
            let desiredSeparation = 25;
            let steer = createVector();
            let count = 0;
            for (let other of boids) {
              let d = p5.Vector.dist(this.position, other.position);
              if (d > 0 && d < desiredSeparation) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.normalize();
                diff.div(d);
                steer.add(diff);
                count++;
              }
            }
            if (count > 0) {
              steer.div(count);
            }
            if (steer.mag() > 0) {
              steer.setMag(this.maxSpeed);
              steer.sub(this.velocity);
              steer.limit(this.maxForce);
            }
            return steer;
          }

          align(boids) {
            let neighborDist = 50;
            let sum = createVector();
            let count = 0;
            for (let other of boids) {
              let d = p5.Vector.dist(this.position, other.position);
              if (d > 0 && d < neighborDist) {
                sum.add(other.velocity);
                count++;
              }
            }
            if (count > 0) {
              sum.div(count);
              sum.setMag(this.maxSpeed);
              let steer = p5.Vector.sub(sum, this.velocity);
              steer.limit(this.maxForce);
              return steer;
            } else {
              return createVector();
            }
          }

          cohesion(boids) {
            let neighborDist = 50;
            let sum = createVector();
            let count = 0;
            for (let other of boids) {
              let d = p5.Vector.dist(this.position, other.position);
              if (d > 0 && d < neighborDist) {
                sum.add(other.position);
                count++;
              }
            }
            if (count > 0) {
              sum.div(count);
              return this.seek(sum);
            } else {
              return createVector();
            }
          }

          seek(target) {
            let desired = p5.Vector.sub(target, this.position);
            desired.setMag(this.maxSpeed);
            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxForce);
            return steer;
          }
        } 