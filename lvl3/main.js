'use strict';
console.log("スピードを調整");
let screenCanvas, info;
let run = true;
let mouse = new Point();
let fire = false;
let startTime;
let isRunning = false;
let timeOutId;
const reset = document.getElementById('reset');
//  -- main ----------------------
window.onload = () => {
    let counter = 0;
    let message;
    let score = 0;
    let i, j;
    let p = new Point();
    let ctx;
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 400;
    screenCanvas.height = 400;

    ctx = screenCanvas.getContext('2d');

    // イベントの登録
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('keydown', keyDown, true);

    // elements
    info = document.getElementById('info');

    // 自機の初期化
    const chara_shot_max_count = 10;
    let chara = new Character();
    chara.init(14);
    let charaShot = new Array(chara_shot_max_count);
    for(i=0; i < chara_shot_max_count; i++){
        charaShot[i] = new CharacterShot;
    }


    // 敵の初期化
    const enemyMaxCount = 1000;
    let enemy = new Array(enemyMaxCount);
    for(i=0; i<enemyMaxCount; i++){
        enemy[i] = new Enemy();
    }

    // 敵キャラクターの弾幕の初期化
    const enemyShotMaxCount = 500;
    let enemyShot = new Array(enemyShotMaxCount);
    for(i = 0; i < enemyShotMaxCount; i++){
        enemyShot[i] = new EnemyShot();
    }

    // ボスの初期化
    let boss = new Boss();

    // ボスのビットを初期化
    const bossBitCount = 5;
    let bit = new Array(bossBitCount);
    for(i = 0; i < bossBitCount; i++){
        bit[i] = new Bit();
    }

    // 初期位置の設定
    mouse.x = screenCanvas.width / 2;
    mouse.y = screenCanvas.height - 25;

    // レンダリング処理--------------------------------------------

 (function fnc(){
        counter++;
        
        info.innerHTML = 'SCORE: ' + (score * 100) + ' ' + message;

        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        // パスの設定を開始
        ctx.beginPath();

        // 自機の位置を設定--------------------------------------------------------
        chara.position.x = mouse.x;
        chara.position.y = mouse.y;

        // 円の色
        // ctx.fillStyle = 'rgba(0, 0, 255, 0.75);'

        // 自機を描パスの設定
        ctx.arc(
                chara.position.x,
                chara.position.y,
                chara.size,
                0, Math.PI * 2, false
            );

        // 自機の色を設定
        const CHARA_COLOR = 'rgba(159, 84, 230, 0.562)';
        ctx.fillStyle = CHARA_COLOR;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        // 自機を描く
        ctx.fill();
        // ----------------------------------------------------------------

        // fire（真偽値）により発射の分岐
        if(fire){
            for(i = 0; i< chara_shot_max_count; i++){
                if(!charaShot[i].alive){
                    charaShot[i].CharacterShotSet(chara.position, 3, 7);
                    break;
                }
            }
            fire = false;
        }

        // ショットを描くパスを設定
        ctx.beginPath();
            for(i = 0; i < chara_shot_max_count; i++) {
                if(charaShot[i].alive) {

                    charaShot[i].CharacterShotMove();

                    ctx.arc(
                        charaShot[i].position.x,
                        charaShot[i].position.y,
                        charaShot[i].size,
                        0, Math.PI * 2, false
                    );
                    ctx.closePath();
                }
            }
            
            const chara_shot_color = 'rgba(218, 76, 11, 0.75)';
            ctx.fillStyle = chara_shot_color;
            ctx.fill();
            
 // ----------------------------------------------------------------
            if(counter % 100 === 0 && counter < 1000){
                    for(i = 0; i < enemyMaxCount; i++){
                        if(!enemy[i].alive){
                            let enemySize = 10;
                            p.y = screenCanvas.height / 2;
                            // 敵キャラのタイプを決定
                            let type = Math.floor(Math.random() * 2) + 1;
                            if(type === 1){
                                p.x = 0;
                            }else{
                                p.x = screenCanvas.width + enemySize;
                            }
                            // タイプに応じて出現座標を設定
                            enemy[i].EnemySet(p, enemySize, type);
                            // 一体出現させたのでループを終了
                            break;
                        }
                    }
                
            }
            if(counter === 1100){
                // ボスの登場
                p.x = screenCanvas.width / 2;
                p.y = -80;
                boss.BossSet(p, 50, 60);

                // 同時にビットも登場させる
                for(i = 0; i < bossBitCount; i++){
                    j = 360 / bossBitCount;
                    bit[i].BitSet(boss, 15, 5, i * j);
                }
            }
            // counter　の値によってシーンを分岐--------------------------------------------------------
           switch(true){
               case counter < 70:
                ctx.font = 'bold 2em Impact';
                ctx.fillText('READY...', 100, 100);
                   break;


               case counter < 100:
                //    ctx.clearRect(0, 0, 100, 100);
                   ctx.font = 'bold 2em verdana';
                   ctx.fillText('GO !!', 100, 100);
                   break;
            default:
                

                ctx.beginPath();
            // 全ての敵キャラクターを調査する
            for(i = 0; i < enemyMaxCount; i++){

                if(!isRunning){
                    isRunning = true;
                    startTime = Date.now();
                    runtimer();
                }
                // 敵キャラクターの生死を判別
                if(enemy[i].alive){
                    // 敵キャラクターを動かす
                    enemy[i].EnemyMove();

                    // 敵キャラクターを描くパスを設定
                    ctx.arc(
                        enemy[i].position.x,
                        enemy[i].position.y,
                        enemy[i].size,
                        0, Math.PI * 2, false
                    );

                    // 弾幕を打つかどうかパラメータの値からチェック
                    if(enemy[i].param % 30 === 0){
                        // 敵キャラクターの弾幕を調べる
                        for(j = 0; j < enemyShotMaxCount; j++){

                            if(!enemyShot[j].alive){
                                let shotSpeed = Math.floor(Math.random()*(7-1));
                                
                                // 敵キャラクターの弾幕を新規にセットする
                                p = enemy[i].position.distance(chara.position);
                                p.normalize();
                                // p.y -= rnd;
                                enemyShot[j].EnemyShotSet(enemy[i].position, p, 5, shotSpeed);
                                // 一個出現させたらブレーク
                                break;
                            }  
                        }
                    }
                    ctx.closePath();
                }
            }

            const enemyColor = 'rgba(206, 18, 18, 0.63)';
            ctx.fillStyle = enemyColor;

            ctx.fill();

            // 敵キャラクターの弾幕の描画-----------------------------------------------------------------
            ctx.beginPath();

            for(i = 0; i < enemyShotMaxCount; i++){
                if(enemyShot[i].alive){

                    enemyShot[i].EnemyShotMove();

                    ctx.arc(
                        enemyShot[i].position.x,
                        enemyShot[i].position.y,
                        enemyShot[i].size,
                        0, Math.PI * 2, false
                    );

                    ctx.closePath();
                }
            }

            const enemyShotColor = 'rgba(14, 2, 121, 0.75)';
            ctx.fillStyle = enemyShotColor;
            ctx.fill();

                    // ボスの描画--------------------------------------------------------
        ctx.beginPath();

        if(boss.alive){
            // もしボスが出現していたら、ボスを動かす
            boss.BossMove();

            ctx.arc(
                boss.position.x,
                boss.position.y,
                boss.size,
                0, Math.PI * 2, false
            );
            ctx.closePath();
        }

        // ボスの色を設定
        const bossColor = 'rgba(128, 128, 128, 0.75)';
        ctx.fillStyle = bossColor;
        
        // 描画
        ctx.fill();

        // ビットの描画------------------------------------------------
        ctx.beginPath();
        for(i = 0; i < bossBitCount; i++){
            if(bit[i].alive){
                bit[i].BitMove();

                ctx.arc(
                    bit[i].position.x,
                    bit[i].position.y,
                    bit[i].size,
                    0, Math.PI * 2, false
                );

                // ショットを打つかどうかパラメータからチェック
                if(bit[i].param % 30 === 0){
                    for(j = 0; j < enemyShotMaxCount; j++){
                        if(!enemyShot[j].alive){
                            let shotSpeed = 6;
                            // 新規に弾幕を設定
                            p = bit[i].position.distance(chara.position);
                            p.normalize();
                            // p.x += 0.3;
                            // p.y += 0.2;
                            enemyShot[j].EnemyShotSet(bit[i].position, p, 4, shotSpeed);

                            break;
                        }
                    }
                }
                ctx.closePath();
            }
        }
        // ビットの色を設定
        const bossBitColor = 'rgba(64, 64, 64, 0.75)';
        ctx.fillStyle = bossBitColor;
        ctx.fill();

            // 当たり判定の設定ーーーーーーー------------------------------------
            for(i = 0; i < chara_shot_max_count; i++){
                if(charaShot[i].alive){
                    for(j = 0; j < enemyMaxCount; j++){
                        if(enemy[j].alive){
                            // 敵キャラクターと自身との距離を測定
                         p = enemy[j].position.distance(charaShot[i].position);
                            if((p.length()) - 7 < enemy[j].size){
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
                    for(j = 0; j < bossBitCount; j++){
                        //   ビットの生死を確認
                        if(bit[j].alive){
                            // 自身の弾幕とビットとの距離を計測
                            p = bit[j].position.distance(charaShot[i].position);
                            if(p.length() < bit[j].size){
                                // 当たっていたら耐久値を減らす
                                bit[j].life--;

                                // 自身の弾幕を消す
                                charaShot[i].alive = false;

                                // 耐久値を削り切ったら生死フラグをfalseにする
                                if(bit[j].life < 0){
                                    bit[j].alive = false;
                                    score += 3;
                                }
                                break;
                            }
                        }
                    }
                    // ボスの生死フラグをチェック
                    if(boss.alive){
                        // 自身の弾幕とボスの当たり判定
                        p = boss.position.distance(charaShot[i].position);
                        if(p.length() < boss.size){
                            // 当たったら体力を減らす
                            boss.life --;
            
                            // 自身の弾幕を消す
                            charaShot[i].alive = false;
            
                            // 体力が無くなったらクリア
                            if(boss.life < 0){
                                score += 10;
                                run = false;
                                ctx.font = 'bold 2em verdana';
                                ctx.fillStyle = 'red';
                                ctx.fillText('CLEAR!!', 100, 100);
                                clearTimeout(timeOutId);
                                reset.classList = 'reset';
                                document.getElementById('next').classList = 'next';
                            }
                        }
                    }
                }
            }

            // 敵の弾幕の当たり判定------------------------------
            for(i = 0; i < enemyShotMaxCount; i++){
                if(enemyShot[i].alive){
                    // 自身と敵の弾幕との距離を測定
                    p = chara.position.distance(enemyShot[i].position);
                    if(p.length() < chara.size){
                        ctx.font = 'bold 2em verdana';
                        ctx.fillStyle = 'red';
                        ctx.fillText('GAME OVER', 100, 100);
                        clearTimeout(timeOutId);
                        chara.alive = false;
                        run = false;
                        
                        reset.classList = 'reset';
                        break;
                    }
                }
            }
            break;
    }

 // --------------------------------------------------------------
        info.innerHTML = 'SCORE　:　' + (score * 100);
        // -----------------------------------------------------------------------------------------------------
            // フラグによる再帰呼出
            let fps = 1000 / 30;
            if(run)setTimeout(fnc, fps);
   })();
};

// -- event ----------------------
const mouseMove = (event)=> {
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

const mouseDown = ()=> {
    fire = true;
}

const keyDown = (event)=> {
    let ck = event.keyCode;

    if(ck === 37){
        if(mouse.x < 7)return;
        mouse.x -= 15;
    }

    if(ck === 39){
        if(mouse.x > screenCanvas.width - 7)return;
        mouse.x += 15;
    }

    if(ck === 38){
        if(mouse.y < 7)return;
        mouse.y -= 15;
    }

    if(ck === 40){
        if(mouse.y > screenCanvas.height - 7)return;
        mouse.y += 15;
    }
    
    if(ck === 70)fire = true;

    // 中断
    if(ck === 27){
        run = false;
    }
}

const runtimer = () => {
    document.getElementById('time').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
   timeOutId = setTimeout(()=> {
        runtimer();
    });
}
