import { canvas } from "../init/variable";
import { Point } from "./Point";

class Boss {
  position: Point;
  size: number;
  life: number;
  param: number;
  alive: boolean;
  constructor() {
    this.position = new Point();
    this.size = 0;
    this.life = 0;
    this.param = 0;
    this.alive = false;
  }

  BossSet(p: Point, size: number, life: number) {
    // 座標を設定
    this.position.x = p.x;
    this.position.y = p.y;

    // サイズ、体力（耐久値）を設定
    this.size = size;
    this.life = life;

    // パラメータのリセット
    this.param = 0;

    // 出現させる（　生死フラグを　立てる　）
    this.alive = true;
  }

  BossMove() {
    let i, j;
    // パラメータのインクリメント
    this.param++;

    // パラメータに応じて分岐処理
    switch (true) {
      case this.param < 100:
        // 下方向へまっすぐすすむ
        this.position.y += 1.5;
        break;
      default:
        // パラメータからラジアンを求める
        i = (((this.param - 100) % 360) * Math.PI) / 180;

        // ラジアンから横移動量を測定
        j = canvas.width / 2;
        this.position.x = j + Math.sin(i) * j;
        break;
    }
  }
}

export { Boss };
