import {
  canvas,
  constants,
  info,
  mouse,
  player,
  variables,
  playerShot,
  enemy,
  enemyShot,
  bit,
  boss,
  reset,
} from "../init/variable";
import { runTimer } from "./runTimer";

const gameLoop = () => {
  let message: string = "";
  variables.counter++;

  if (info) {
    info.innerHTML = "SCORE: " + variables.score * 100 + " " + message;
  }
  // 自機の位置を設定--------------------------------------------------------
  player.position.x = mouse.x;
  player.position.y = mouse.y;

  if (variables.ctx) {
    variables.ctx.clearRect(0, 0, canvas.width, canvas.height);
    // パスの設定を開始
    variables.ctx.beginPath();
  }

  // 自機を描パスの設定
  if (variables.ctx) {
    variables.ctx.arc(
      player.position.x,
      player.position.y,
      player.size,
      0,
      Math.PI * 2,
      false
    );

    // 自機の色を設定
    variables.ctx.fillStyle = constants.playerColor;
    variables.ctx.strokeStyle = "black";
    variables.ctx.stroke();
    // 自機を描く
    variables.ctx.fill();
  }

  // ----------------------------------------------------------------

  // vars.fire（真偽値）により発射の分岐
  if (variables.fire) {
    for (let i = 0; i < constants.playerShotMaxCount; i++) {
      if (!playerShot[i].alive) {
        playerShot[i].CharacterShotSet(player.position, 3, 7);
        break;
      }
    }
    variables.fire = false;
  }

  // ショットを描くパスを設定
  if (variables.ctx) {
    variables.ctx.beginPath();
    for (let i = 0; i < constants.playerShotMaxCount; i++) {
      if (playerShot[i].alive) {
        playerShot[i].CharacterShotMove();

        variables.ctx.arc(
          playerShot[i].position.x,
          playerShot[i].position.y,
          playerShot[i].size,
          0,
          Math.PI * 2,
          false
        );
        variables.ctx.closePath();
      }
    }

    variables.ctx.fillStyle = constants.playerShotColor;
    variables.ctx.fill();
  }

  if (variables.counter % 100 === 0 && variables.counter < 2800) {
    for (let i = 0; i < constants.enemyMaxCount; i++) {
      if (!enemy[i].alive) {
        // 敵キャラのタイプを決定
        let j = Math.floor(Math.random() * 4) + 1;

        let sel = j % 2;
        let enemySize = 10;
        let sel2 = Math.floor(Math.random() * 2) + 0;

        if (sel2) {
          if (sel === 0) {
            variables.p.x = -enemySize;
            if (j === 2) {
              variables.p.y = 0 - enemySize;
            } else {
              variables.p.y = canvas.height - enemySize;
            }
          } else {
            variables.p.x = canvas.width + enemySize;
            if (j === 1) {
              variables.p.y = canvas.height - enemySize;
            } else {
              variables.p.y = 0 - enemySize;
            }
          }
        } else {
          if (j % 2 === 0) {
            j = 6;
            variables.p.x = canvas.width + enemySize;
            variables.p.y = canvas.height / 2 - enemySize;
          } else {
            j = 5;
            variables.p.x = -enemySize;
            variables.p.y = canvas.height / 2 - enemySize;
          }
        }

        // タイプに応じて出現座標を設定
        enemy[i].EnemySet(variables.p, enemySize, j);
        // 一体出現させたのでループを終了
        break;
      }
    }
  }
  if (variables.counter === 3000) {
    // ボスの登場
    variables.p.x = canvas.width / 2;
    variables.p.y = -80;
    boss.BossSet(variables.p, 50, 60);

    // 同時にビットも登場させる
    for (let i = 0; i < constants.bossBitCount; i++) {
      let j = 360 / constants.bossBitCount;
      bit[i].BitSet(boss, 15, 5, i * j);
    }
  }
  // counter　の値によってシーンを分岐--------------------------------------------------------
  if (variables.ctx) {
    switch (true) {
      case variables.counter < 70:
        variables.ctx.font = "bold 2em Impact";
        variables.ctx.fillText("READY...", 100, 100);
        break;

      case variables.counter < 100:
        //    vars.ctx.clearRect(0, 0, 100, 100);
        variables.ctx.font = "bold 2em verdana";
        variables.ctx.fillText("GO !!", 100, 100);
        break;
      default:
        variables.ctx.beginPath();
        // 全ての敵キャラクターを調査する
        for (let i = 0; i < constants.enemyMaxCount; i++) {
          if (!variables.isRunning) {
            variables.isRunning = true;
            variables.startTime = Date.now();
            runTimer();
          }
          // 敵キャラクターの生死を判別
          if (enemy[i].alive) {
            // 敵キャラクターを動かす
            enemy[i].EnemyMove();

            // 敵キャラクターを描くパスを設定
            variables.ctx.arc(
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
              for (let j = 0; j < constants.enemyShotMaxCount; j++) {
                if (!enemyShot[j].alive) {
                  let shotSpeed = Math.floor(Math.random() * (13 + 1)) + 0;

                  // 敵キャラクターの弾幕を新規にセットする
                  variables.p = enemy[i].position.distance(player.position);
                  variables.p.normalize();
                  let rnd = Math.random() * (1 + 0.9) - 1;
                  variables.p.x += rnd;
                  // vars.p.y -= rnd;
                  enemyShot[j].EnemyShotSet(
                    enemy[i].position,
                    variables.p,
                    5,
                    shotSpeed
                  );
                  // 一個出現させたらブレーク
                  break;
                }
              }
            }
            variables.ctx.closePath();
          }
        }

        variables.ctx.fillStyle = constants.enemyColor;

        variables.ctx.fill();

        // 敵キャラクターの弾幕の描画-----------------------------------------------------------------
        variables.ctx.beginPath();

        for (let i = 0; i < constants.enemyShotMaxCount; i++) {
          if (enemyShot[i].alive) {
            enemyShot[i].EnemyShotMove();

            variables.ctx.arc(
              enemyShot[i].position.x,
              enemyShot[i].position.y,
              enemyShot[i].size,
              0,
              Math.PI * 2,
              false
            );

            variables.ctx.closePath();
          }
        }

        variables.ctx.fillStyle = constants.enemyShotColor;
        variables.ctx.fill();

        // ボスの描画--------------------------------------------------------
        variables.ctx.beginPath();

        if (boss.alive) {
          // もしボスが出現していたら、ボスを動かす
          boss.BossMove();

          variables.ctx.arc(
            boss.position.x,
            boss.position.y,
            boss.size,
            0,
            Math.PI * 2,
            false
          );
          variables.ctx.closePath();
        }

        // ボスの色を設定
        variables.ctx.fillStyle = constants.bossColor;

        // 描画
        variables.ctx.fill();

        // ビットの描画------------------------------------------------
        variables.ctx.beginPath();
        for (let i = 0; i < constants.bossBitCount; i++) {
          if (bit[i].alive) {
            bit[i].BitMove();

            variables.ctx.arc(
              bit[i].position.x,
              bit[i].position.y,
              bit[i].size,
              0,
              Math.PI * 2,
              false
            );

            // ショットを打つかどうかパラメータからチェック
            if (bit[i].param % 30 === 0) {
              for (let j = 0; j < constants.enemyShotMaxCount; j++) {
                if (!enemyShot[j].alive) {
                  let shotSpeed = Math.floor(Math.random() * (6 - 1)) + 1;
                  // 新規に弾幕を設定
                  variables.p = bit[i].position.distance(player.position);
                  variables.p.normalize();
                  // vars.p.x += 0.3;
                  // vars.p.y += 0.2;
                  enemyShot[j].EnemyShotSet(
                    bit[i].position,
                    variables.p,
                    4,
                    shotSpeed
                  );

                  break;
                }
              }
            }
            variables.ctx.closePath();
          }
        }
        // ビットの色を設定
        variables.ctx.fillStyle = constants.bossBitColor;
        variables.ctx.fill();

        // 当たり判定の設定ーーーーーーー------------------------------------
        for (let i = 0; i < constants.playerShotMaxCount; i++) {
          if (playerShot[i].alive) {
            for (let j = 0; j < constants.enemyMaxCount; j++) {
              if (enemy[j].alive) {
                // 敵キャラクターと自身との距離を測定
                variables.p = enemy[j].position.distance(
                  playerShot[i].position
                );
                if (variables.p.length() - 7 < enemy[j].size) {
                  // 当たっていたら生死フラグをfalseにする
                  enemy[j].alive = false;
                  playerShot[i].alive = false;

                  // 弾幕が敵キャラクターに当たったのでスコアを増やす
                  variables.score++;
                  break;
                }
              }
            }
            // 自身の弾幕とボスビットとの当たり判定
            for (let j = 0; j < constants.bossBitCount; j++) {
              //   ビットの生死を確認
              if (bit[j].alive) {
                // 自身の弾幕とビットとの距離を計測
                variables.p = bit[j].position.distance(playerShot[i].position);
                if (variables.p.length() < bit[j].size) {
                  // 当たっていたら耐久値を減らす
                  bit[j].life--;

                  // 自身の弾幕を消す
                  playerShot[i].alive = false;

                  // 耐久値を削り切ったら生死フラグをfalseにする
                  if (bit[j].life < 0) {
                    bit[j].alive = false;
                    variables.score += 3;
                  }
                  break;
                }
              }
            }
            // ボスの生死フラグをチェック
            if (boss.alive) {
              // 自身の弾幕とボスの当たり判定
              variables.p = boss.position.distance(playerShot[i].position);
              if (variables.p.length() < boss.size) {
                // 当たったら体力を減らす
                boss.life--;

                // 自身の弾幕を消す
                playerShot[i].alive = false;

                // 体力が無くなったらクリア
                if (boss.life < 0) {
                  variables.score += 10;
                  variables.run = false;
                  variables.ctx.font = "bold 2em verdana";
                  variables.ctx.fillStyle = "red";
                  variables.ctx.fillText("CLEAR!!", 100, 100);
                  clearTimeout(variables.timeOutId);
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
        for (let i = 0; i < constants.enemyShotMaxCount; i++) {
          if (enemyShot[i].alive) {
            // 自身と敵の弾幕との距離を測定
            variables.p = player.position.distance(enemyShot[i].position);
            if (variables.p.length() < player.size) {
              variables.ctx.font = "bold 2em verdana";
              variables.ctx.fillStyle = "red";
              variables.ctx.fillText("GAME OVER", 100, 100);
              clearTimeout(variables.timeOutId);
              variables.run = false;

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
    info.innerHTML = "SCORE　:　" + variables.score * 100;
  }
  // フラグによる再帰呼出
  let fps = 1000 / 30;
  if (variables.run) setTimeout(gameLoop, fps);
};

export { gameLoop };
