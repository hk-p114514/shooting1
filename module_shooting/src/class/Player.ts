import { Point } from "./Point";

// キャラクター自身の設定
class Player {
  public position: Point;
  public size: number;
  public speed: number;
  constructor() {
    this.position = new Point();
    this.size = 0;
    this.speed = 15;
  }

  init(size: number) {
    this.size = size;
  }
}

export { Player as Character };
