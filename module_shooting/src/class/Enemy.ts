import { canvas } from "../init/variable";
import { Point } from "./Point";

class Enemy {
  position: Point;
  size: number;
  type: number;
  param: number;
  alive: boolean;
  constructor() {
    this.position = new Point();
    this.size = 0;
    this.type = 0;
    this.param = 0;
    this.alive = false;
  }
  EnemySet(p: Point, size: number, type: number) {
    this.position.x = p.x;
    this.position.y = p.y;

    // サイズ、タイプを設定
    this.size = size;
    this.type = type;

    // パラメータをリセット
    this.param = 0;

    // 生死判定
    this.alive = true;
  }

  EnemyMove() {
    // パラメータをインクリメント
    this.param++;

    switch (this.type) {
      case 1:
        // X 方向へまっすぐ進む
        this.position.x -= 2;
        this.position.y -= 2;
        // スクリーンの左端より奥に到達したら生存フラグを降ろす
        if (this.position.x > canvas.width + this.size) {
          this.alive = false;
        }
        break;

      case 2:
        // マイナス X 方向へまっすぐ進む
        this.position.x += 2;
        this.position.y += 2;
        // スクリーンの左端より奥に到達したら生存フラグを降ろす
        if (this.position.x < -this.size) {
          this.alive = false;
        }
        break;

      case 3:
        this.position.x -= 2;
        this.position.y += 2;
        if (this.position.x > canvas.width + this.size) {
          this.alive = false;
        }
        break;

      case 4:
        this.position.x += 2;
        this.position.y -= 2;
        if (this.position.x < -this.size) {
          this.alive = false;
        }
        break;
      case 5:
        this.position.x += 2;
        if (this.position.x > canvas.width + this.size) {
          this.alive = false;
        }
        break;
      case 6:
        this.position.x -= 2;
        if (this.position.x < -this.size) {
          this.alive = false;
        }
        break;
    }
  }
}

export { Enemy };
