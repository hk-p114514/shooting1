import { Boss } from "./Boss";
import { Point } from "./Point";

class Bit {
  position: Point;
  parent: Boss | null;
  size: number;
  life: number;
  param: number;
  alive: boolean;
  constructor() {
    this.position = new Point();
    this.parent = null;
    this.size = 0;
    this.life = 0;
    this.param = 0;
    this.alive = false;
  }

  BitSet(parent: Boss, size: number, life: number, param: number) {
    // 母体となるボスをセット
    this.parent = parent;

    // サイズと体力（耐久値）を設定
    this.size = size;
    this.life = life;

    // パラメータをセット
    this.param = param;

    // 出現させる（生死フラグを立てる）
    this.alive = true;
  }

  BitMove() {
    let i, x, y;

    this.param++;

    i = ((this.param % 360) * Math.PI) / 180;

    if (this.parent) {
      x = Math.cos(i) * (this.parent.size + this.size);
      y = Math.sin(i) * (this.parent.size + this.size);
      this.position.x = this.parent.position.x + x;
      this.position.y = this.parent.position.y + y;
    }
  }
}

export { Bit };
