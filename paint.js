const paintSketch = (p) => {
  let currentkey = '1';
  let bgc;
  let gkcount;

  p.setup = () => {
    p.createCanvas(800, 600);
    p.background(255);
    p.smooth();
    bgc = p.color(255);
    gkcount = 20;
  };

  p.draw = () => {
    if (p.keyIsPressed) {
      clear_print();
    }
    if (p.mouseIsPressed) {
      drawChoice();
    }
  };

  function drawChoice() {
    let currentkey = p.key;

    switch(currentkey) {
      case '1':
        console.log("1");
        chrisblackline(p.color(0), p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        break;
      case '2':
        console.log("2");
        chrisTribrush(p.color(255,0,0), p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        break;
      case '3':
        console.log("3");
        chris3dsculptingbrush(p.color(0), p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        break;
      case '4':
        console.log("4");
        chrisshadowbrush(p.color(255,0,0,50), p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        break;
      case '5':
        console.log("5");
        eraser(bgc, p.mouseX, p.mouseY, 25);
        break;
      case '6':
        console.log("6");
        (gkcount, p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

        if (gkcount > 255) {
          gkcount = 30;
        } else {
          gkcount += 3;
        }

        break;
      case '7':
        console.log("7");
        chrisTribrushtest(p.color(150,20,100), p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        break;
      case '8':
        console.log("8");
        chrisshadowbrush(p.color(255,0,0,50), p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        break;
      case '9':
        console.log("9");
        chrisgreenline(p.color(0,200,55), p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        break;
      default:
        console.log("None");
        break;
    }
  }

  function chrisblackline(k, lx, ly, px, py) {
    p.strokeWeight(5);
    p.stroke(k);
    p.line(lx, ly, px, py);
  }

  function chrisgreenline(k, lx, ly, px, py) {
    p.strokeWeight(2.5);
    p.stroke(k);
    p.line(lx, ly, px, py);
  }

  function chrisshadowbrush(k, lx, ly, px, py) {
    p.strokeWeight(20);
    p.stroke(k);
    p.line(lx, ly, px, py);
  }

  function chris3dsculptingbrush(kcount, lx, ly, px, py) {
    p.strokeWeight(1);
    p.stroke(0, kcount, 0);
    p.rect(lx, ly, px, py);
  }

  function chrisTribrush(kcount, lx, ly, px, py) {
    p.strokeWeight(p.random(1,35));
    p.stroke(0, kcount, 0);
    p.triangle(lx, ly, px, py);
  }

  function chrisTribrushtest(kcount, lx, ly, px, py) {
    p.strokeWeight(p.random(1,35));
    p.stroke(0, kcount, 0);
    p.triangle(lx, 75, ly, 20, px, py);
  }

  function chrisCirclebrush(kcount, lx, ly, px, py) {
    p.strokeWeight(0);
    p.stroke(0);
    p.ellipse(kcount, lx, ly, px, py);
  }

  function eraser(k, lx, ly, sz) {
    p.stroke(k);
    p.ellipse(lx, ly, sz, sz);
  }

  function clear_print() {
    if (p.key == 'x' || p.key == 'X') {
      p.background(255);
    } else if (p.key == 'p' || p.key == 'P') {
      p.saveFrames('paintImage', 'png', 1, 25, data => {
        console.log(data);
      });
    }
  }
};
