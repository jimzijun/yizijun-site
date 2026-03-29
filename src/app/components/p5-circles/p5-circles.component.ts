import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { P5Circle } from './p5-circle';

@Component({
  selector: 'app-p5-circles',
  templateUrl: './p5-circles.component.html',
  styleUrls: ['./p5-circles.component.scss'],
  standalone: false
})
export class P5CirclesComponent implements OnInit {
  public sketchInstance?: p5;

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    this.sketchInstance = new p5(this.sketch);
  }

  private readonly sketch = (p: p5) => {
    p.setup = () => {
      const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
      canvas.parent('canvas1');
      p.fill(0);
      p.noStroke();
      p.frameRate(45);
    };

    const circles: P5Circle[] = [];
    const colorR = Math.random() * 0.5;
    const colorSca = shuffleArray([1, colorR * 2, colorR]);
    let attempt = 0;
    p.draw = () => {
      p.background(0);
      const total = 15;
      let count = 0;
      while (count < total) {
        let valid = true;
        const c = new P5Circle();
        for (let i = 0; i < circles.length; i++) {
          let d = p.dist(c.x, c.y, circles[i].x, circles[i].y);
          if (d < circles[i].r) {
            valid = false;
          }
        }
        if (valid && c !== null) {
          count++;
          circles.push(c);
        } else {
          attempt++;
          if (attempt > 500) {
            p.noLoop();
            break;
          }
        }
      };

      for (let i = 0; i < circles.length; i++) {
        if (circles[i].edge()) {
          circles[i].growing = false;
        }
        for (let z = 0; z < circles.length; z++) {
          if (i !== z) {
            const d = p.dist(circles[i].x, circles[i].y, circles[z].x, circles[z].y);
            if (d < circles[i].r / 2 + circles[z].r / 2) {
              circles[i].growing = false;
              break;
            }
          }
        }
        circles[i].grow();
        p.noStroke();
        p.fill(circles[i].red * colorSca[0], circles[i].green * colorSca[1], circles[i].blue * colorSca[2]);
        p.ellipse(circles[i].x, circles[i].y, circles[i].r);
      }
    };
  };
}

function shuffleArray(values: number[]) {
  let i = values.length;
  let j = 0;
  let t = 0;
  const shuffled = values.slice();
  while (--i) {
    j = ~~(Math.random() * (i + 1));
    t = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = t;
  }
  return shuffled;
}
