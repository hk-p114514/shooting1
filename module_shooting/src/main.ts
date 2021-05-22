"use strict";
// 定数、変数の情報
import {
  canvas,
  variables,
  player,
  constants,
  playerShot,
  enemy,
  enemyShot,
  bit,
  mouse,
} from "./init/variable";
// クラス
import { CharacterShot } from "./class/CharacterShot";
import { Enemy } from "./class/Enemy";
import { EnemyShot } from "./class/EnemyShot";
import { Bit } from "./class/Bit";
// 関数
import { mouseMove } from "./functions/mouseMove";
import { mouseDown } from "./functions/mouseDown";
import { keyDown } from "./functions/keyDown";
import { gameLoop } from "./functions/gameLoop";

// コンテキストの取得
if (canvas) {
  variables.ctx = canvas.getContext("2d");
}

variables.counter = 0;
canvas.width = 400;
canvas.height = 400;

// イベントの登録
canvas.addEventListener("mousemove", mouseMove, true);
canvas.addEventListener("mousedown", mouseDown, true);
document.addEventListener("keydown", keyDown, true);

// 自機の初期化
player.init(14);
for (let i = 0; i < constants.playerShotMaxCount; i++) {
  playerShot[i] = new CharacterShot();
}

// 敵の初期化
for (let i = 0; i < constants.enemyMaxCount; i++) {
  enemy[i] = new Enemy();
}

// 敵キャラクターの弾幕の初期化
for (let i = 0; i < constants.enemyShotMaxCount; i++) {
  enemyShot[i] = new EnemyShot();
}

// ボスのビットを初期化
for (let i = 0; i < constants.bossBitCount; i++) {
  bit[i] = new Bit();
}

// 初期位置の設定
mouse.x = canvas.width / 2;
mouse.y = canvas.height - 25;

gameLoop();
