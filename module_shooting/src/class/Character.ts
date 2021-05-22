import { Point } from "./Point";

// キャラクター自身の設定
class Character {
  public position: Point;
  public size: number;
  constructor() {
    this.position = new Point();
    this.size = 0;
  }

  init(size: number) {
    this.size = size;
  }
}

export { Character };
