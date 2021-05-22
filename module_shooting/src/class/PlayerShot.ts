import { constants } from "../init/variable";
import { Point } from "./Point";

// 弾幕の設定
class PlayerShot {
  position: Point;
  size: number;
  speed: number;
  alive: boolean;
  constructor() {
    this.position = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
  }

  CharacterShotSet(p: Point, size: number, speed: number) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speed = speed;
    this.alive = true;
  }

  CharacterShotMove() {
    this.position.y -= this.speed;

    if (this.position.y < -this.size) this.alive = false;
  }
}

export { PlayerShot as CharacterShot };
