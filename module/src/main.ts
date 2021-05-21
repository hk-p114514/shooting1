"use strict";
// 座標の情報
import { Point } from "./class/Point";
// プレイヤーの情報
import { Character } from "./class/Chacater";
import { CharacterShot } from "./class/CharacterShot";
// 敵キャラクターの情報
import { Enemy } from "./class/Enemy";
import { EnemyShot } from "./class/EnemyShot";
// ボスキャラクターの情報
import { Boss } from "./class/Boss";
import { Bit } from "./class/Bit";
// 定数、変数の情報
import {
  canvas,
  vars,
  player,
  consts,
  charaShot,
  enemy,
  enemyShot,
} from "./init/variable";

if (canvas) {
  vars.ctx = canvas.getContext("2d");
}

//  -- main ----------------------
window.onload = () => {
  let counter = 0;
  let message;
  let score = 0;
  canvas.width = 400;
  canvas.height = 400;

  // イベントの登録
  canvas.addEventListener("mousemove", mouseMove, true);
  canvas.addEventListener("mousedown", mouseDown, true);
  window.addEventListener("keydown", keyDown, true);

  // elements

  // 自機の初期化
  player.init(14);
  for (let i = 0; i < consts.charaShotMaxCount; i++) {
    charaShot[i] = new CharacterShot();
  }

  // 敵の初期化
  for (let i = 0; i < consts.enemyMaxCount; i++) {
    enemy[i] = new Enemy();
  }

  // 敵キャラクターの弾幕の初期化
  for (let i = 0; i < consts.enemyShotMaxCount; i++) {
    enemyShot[i] = new EnemyShot();
  }

  // ボスの初期化

  // ボスのビットを初期化
  for (let i = 0; i < bossBitCount; i++) {
    bit[i] = new Bit();
  }

  // 初期位置の設定
  mouse.x = canvas.width / 2;
  mouse.y = canvas.height - 25;

  // レンダリング処理--------------------------------------------

  (function fnc() {
    counter++;

    if (info) {
      info.innerHTML = "SCORE: " + score * 100 + " " + message;
    }

    if (vars.ctx) {
      vars.ctx.clearRect(0, 0, canvas.width, canvas.height);
      // パスの設定を開始
      vars.ctx.beginPath();
    }

    // 自機の位置を設定--------------------------------------------------------
    player.position.x = mouse.x;
    player.position.y = mouse.y;

    // 自機を描パスの設定
    if (vars.ctx) {
      vars.ctx.arc(
        player.position.x,
        player.position.y,
        player.size,
        0,
        Math.PI * 2,
        false
      );

      // 自機の色を設定
      vars.ctx.fillStyle = CHARA_COLOR;
      vars.ctx.strokeStyle = "black";
      vars.ctx.stroke();
      // 自機を描く
      vars.ctx.fill();
    }
    // ----------------------------------------------------------------

    // vars.fire（真偽値）により発射の分岐
    if (vars.fire) {
      for (let i = 0; i < consts.charaShotMaxCount; i++) {
        if (!charaShot[i].alive) {
          charaShot[i].CharacterShotSet(player.position, 3, 7);
          break;
        }
      }
      vars.fire = false;
    }

    // ショットを描くパスを設定
    if (vars.ctx) {
      vars.ctx.beginPath();
      for (let i = 0; i < consts.charaShotMaxCount; i++) {
        if (charaShot[i].alive) {
          charaShot[i].CharacterShotMove();

          vars.ctx.arc(
            charaShot[i].position.x,
            charaShot[i].position.y,
            charaShot[i].size,
            0,
            Math.PI * 2,
            false
          );
          vars.ctx.closePath();
        }
      }

      vars.ctx.fillStyle = chara_shot_color;
      vars.ctx.fill();
    }

    // ----------------------------------------------------------------
    if (counter % 100 === 0 && counter < 2800) {
      for (let i = 0; i < consts.enemyMaxCount; i++) {
        if (!enemy[i].alive) {
          // 敵キャラのタイプを決定
          let j = Math.floor(Math.random() * 4) + 1;

          let sel = j % 2;
          let enemySize = 10;
          let sel2 = Math.floor(Math.random() * 2) + 0;

          if (sel2) {
            if (sel === 0) {
              vars.p.x = -enemySize;
              if (j === 2) {
                vars.p.y = 0 - enemySize;
              } else {
                vars.p.y = canvas.height - enemySize;
              }
            } else {
              vars.p.x = canvas.width + enemySize;
              if (j === 1) {
                vars.p.y = canvas.height - enemySize;
              } else {
                vars.p.y = 0 - enemySize;
              }
            }
          } else {
            if (j % 2 === 0) {
              j = 6;
              vars.p.x = canvas.width + enemySize;
              vars.p.y = canvas.height / 2 - enemySize;
            } else {
              j = 5;
              vars.p.x = -enemySize;
              vars.p.y = canvas.height / 2 - enemySize;
            }
          }

          // タイプに応じて出現座標を設定
          enemy[i].EnemySet(vars.p, enemySize, j);
          // 一体出現させたのでループを終了
          break;
        }
      }
    }
    if (counter === 3000) {
      // ボスの登場
      vars.p.x = canvas.width / 2;
      vars.p.y = -80;
      boss.BossSet(vars.p, 50, 60);

      // 同時にビットも登場させる
      for (let i = 0; i < bossBitCount; i++) {
        let j = 360 / bossBitCount;
        bit[i].BitSet(boss, 15, 5, i * j);
      }
    }
    // counter　の値によってシーンを分岐--------------------------------------------------------
    if (vars.ctx) {
      switch (true) {
        case counter < 70:
          vars.ctx.font = "bold 2em Impact";
          vars.ctx.fillText("READY...", 100, 100);
          break;

        case counter < 100:
          //    vars.ctx.clearRect(0, 0, 100, 100);
          vars.ctx.font = "bold 2em verdana";
          vars.ctx.fillText("GO !!", 100, 100);
          break;
        default:
          vars.ctx.beginPath();
          // 全ての敵キャラクターを調査する
          for (let i = 0; i < consts.enemyMaxCount; i++) {
            if (!isRunning) {
              isRunning = true;
              startTime = Date.now();
              runtimer();
            }
            // 敵キャラクターの生死を判別
            if (enemy[i].alive) {
              // 敵キャラクターを動かす
              enemy[i].EnemyMove();

              // 敵キャラクターを描くパスを設定
              vars.ctx.arc(
                enemy[i].position.x,
                enemy[i].position.y,
                enemy[i].size,
                0,
                Math.PI * 2,
                false
              );

              // 弾幕を打つかどうかパラメータの値からチェック
              if (enemy[i].param % 30 === 0) {
                // 敵キャラクターの弾幕を調べる
                for (let j = 0; j < consts.enemyShotMaxCount; j++) {
                  if (!enemyShot[j].alive) {
                    let shotSpeed = Math.floor(Math.random() * (13 + 1)) + 0;

                    // 敵キャラクターの弾幕を新規にセットする
                    vars.p = enemy[i].position.distance(player.position);
                    vars.p.normalize();
                    let rnd = Math.random() * (1 + 0.9) - 1;
                    vars.p.x += rnd;
                    // vars.p.y -= rnd;
                    enemyShot[j].EnemyShotSet(
                      enemy[i].position,
                      vars.p,
                      5,
                      shotSpeed
                    );
                    // 一個出現させたらブレーク
                    break;
                  }
                }
              }
              vars.ctx.closePath();
            }
          }

          vars.ctx.fillStyle = enemyColor;

          vars.ctx.fill();

          // 敵キャラクターの弾幕の描画-----------------------------------------------------------------
          vars.ctx.beginPath();

          for (let i = 0; i < consts.enemyShotMaxCount; i++) {
            if (enemyShot[i].alive) {
              enemyShot[i].EnemyShotMove();

              vars.ctx.arc(
                enemyShot[i].position.x,
                enemyShot[i].position.y,
                enemyShot[i].size,
                0,
                Math.PI * 2,
                false
              );

              vars.ctx.closePath();
            }
          }

          vars.ctx.fillStyle = enemyShotColor;
          vars.ctx.fill();

          // ボスの描画--------------------------------------------------------
          vars.ctx.beginPath();

          if (boss.alive) {
            // もしボスが出現していたら、ボスを動かす
            boss.BossMove();

            vars.ctx.arc(
              boss.position.x,
              boss.position.y,
              boss.size,
              0,
              Math.PI * 2,
              false
            );
            vars.ctx.closePath();
          }

          // ボスの色を設定
          vars.ctx.fillStyle = bossColor;

          // 描画
          vars.ctx.fill();

          // ビットの描画------------------------------------------------
          vars.ctx.beginPath();
          for (let i = 0; i < bossBitCount; i++) {
            if (bit[i].alive) {
              bit[i].BitMove();

              vars.ctx.arc(
                bit[i].position.x,
                bit[i].position.y,
                bit[i].size,
                0,
                Math.PI * 2,
                false
              );

              // ショットを打つかどうかパラメータからチェック
              if (bit[i].param % 30 === 0) {
                for (let j = 0; j < consts.enemyShotMaxCount; j++) {
                  if (!enemyShot[j].alive) {
                    let shotSpeed = Math.floor(Math.random() * (6 - 1)) + 1;
                    // 新規に弾幕を設定
                    vars.p = bit[i].position.distance(player.position);
                    vars.p.normalize();
                    // vars.p.x += 0.3;
                    // vars.p.y += 0.2;
                    enemyShot[j].EnemyShotSet(
                      bit[i].position,
                      vars.p,
                      4,
                      shotSpeed
                    );

                    break;
                  }
                }
              }
              vars.ctx.closePath();
            }
          }
          // ビットの色を設定
          vars.ctx.fillStyle = bossBitColor;
          vars.ctx.fill();

          // 当たり判定の設定ーーーーーーー------------------------------------
          for (let i = 0; i < consts.charaShotMaxCount; i++) {
            if (charaShot[i].alive) {
              for (let j = 0; j < consts.enemyMaxCount; j++) {
                if (enemy[j].alive) {
                  // 敵キャラクターと自身との距離を測定
                  vars.p = enemy[j].position.distance(charaShot[i].position);
                  if (vars.p.length() - 7 < enemy[j].size) {
                    // 当たっていたら生死フラグをfalseにする
                    enemy[j].alive = false;
                    charaShot[i].alive = false;

                    // 弾幕が敵キャラクターに当たったのでスコアを増やす
                    score++;
                    break;
                  }
                }
              }
              // 自身の弾幕とボスビットとの当たり判定
              for (let j = 0; j < bossBitCount; j++) {
                //   ビットの生死を確認
                if (bit[j].alive) {
                  // 自身の弾幕とビットとの距離を計測
                  vars.p = bit[j].position.distance(charaShot[i].position);
                  if (vars.p.length() < bit[j].size) {
                    // 当たっていたら耐久値を減らす
                    bit[j].life--;

                    // 自身の弾幕を消す
                    charaShot[i].alive = false;

                    // 耐久値を削り切ったら生死フラグをfalseにする
                    if (bit[j].life < 0) {
                      bit[j].alive = false;
                      score += 3;
                    }
                    break;
                  }
                }
              }
              // ボスの生死フラグをチェック
              if (boss.alive) {
                // 自身の弾幕とボスの当たり判定
                vars.p = boss.position.distance(charaShot[i].position);
                if (vars.p.length() < boss.size) {
                  // 当たったら体力を減らす
                  boss.life--;

                  // 自身の弾幕を消す
                  charaShot[i].alive = false;

                  // 体力が無くなったらクリア
                  if (boss.life < 0) {
                    score += 10;
                    run = false;
                    vars.ctx.font = "bold 2em verdana";
                    vars.ctx.fillStyle = "red";
                    vars.ctx.fillText("CLEAR!!", 100, 100);
                    clearTimeout(timeOutId);
                    if (reset) {
                      reset.classList.remove("playing");
                      reset.classList.add("reset");
                    }
                  }
                }
              }
            }
          }

          // 敵の弾幕の当たり判定------------------------------
          for (let i = 0; i < consts.enemyShotMaxCount; i++) {
            if (enemyShot[i].alive) {
              // 自身と敵の弾幕との距離を測定
              vars.p = player.position.distance(enemyShot[i].position);
              if (vars.p.length() < player.size) {
                vars.ctx.font = "bold 2em verdana";
                vars.ctx.fillStyle = "red";
                vars.ctx.fillText("GAME OVER", 100, 100);
                clearTimeout(timeOutId);
                run = false;

                if (reset) {
                  reset.classList.remove("playing");
                  reset.classList.add("reset");
                }
                break;
              }
            }
          }
          break;
      }
    }

    if (info) {
      info.innerHTML = "SCORE　:　" + score * 100;
    }
    // フラグによる再帰呼出
    let fps = 1000 / 30;
    if (run) setTimeout(fnc, fps);
  })();
};

// -- event ----------------------
const mouseMove = (event: MouseEvent): void => {
  mouse.x = event.clientX - canvas.offsetLeft;
  mouse.y = event.clientY - canvas.offsetTop;
};

const mouseDown = (): void => {
  vars.fire = true;
};

const keyDown = (event: KeyboardEvent) => {
  let k = event.key;

  if (k === "ArrowLeft") {
    if (mouse.x < 7) return;
    mouse.x -= 15;
  }

  if (k === "ArrowRight") {
    if (mouse.x > canvas.width - 7) return;
    mouse.x += 15;
  }

  if (k === "ArrowUp") {
    if (mouse.y < 7) return;
    mouse.y -= 15;
  }

  if (k === "ArrowDown") {
    if (mouse.y > canvas.height - 7) return;
    mouse.y += 15;
  }

  if (k === "space") {
    vars.fire = true;
  }

  // 中断
  if (k === "Escape") {
    run = false;
  }
};

const runtimer = () => {
  if (time !== null) {
    time.textContent = ((Date.now() - startTime) / 1000).toFixed(2);
  }
  timeOutId = setTimeout(() => {
    runtimer();
  });
};
