import { Point } from "./Point";

// 敵キャラクターの弾幕の設定
class EnemyShot {
  position: Point;
  vector: Point;
  size: number;
  speed: number;
  alive: boolean;
  constructor() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
  }

  EnemyShotSet(p: Point, vector: Point, size: number, speed: number) {
    // 座標とベクトルを設定
    this.position.x = p.x;
    this.position.y = p.y;
    this.vector.x = vector.x;
    this.vector.y = vector.y;

    // サイズとスピードを設定
    this.size = size;
    this.speed = speed;

    this.alive = true;
    // console.log("EnemyShot true");
  }

  EnemyShotMove() {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    if (
      this.position.x < -this.size ||
      this.position.y < -this.size ||
      this.position.x > this.size + canvas.width ||
      this.position.y > this.size + canvas.height
    ) {
      this.alive = false;
    }
  }
}

export { EnemyShot };
