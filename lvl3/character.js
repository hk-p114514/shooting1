'use strict';
console.log('character startadfa');

// キャラクター自身の設定
class Character{
    constructor(){
        this.position = new Point();
        this.size = 0;
    }

    init(size){
        this.size = size;
    }

}

// 弾幕の設定
class CharacterShot{
    constructor(){
        this.position = new Point();
        this.size = 0;
        this.speed = 0;
        this.alive = false;
    }

    CharacterShotSet(p, size, speed){
        this.position.x = p.x;
        this.position.y = p.y;
        this.size = size;
        this.speed = speed;
        this.alive = true;
    }

    CharacterShotMove(){
        this.position.y -= this.speed;

        if(this.position.y < -this.size) this.alive = false;
    }
}

console.log('character-mine character ok');

// 敵キャラクタの情報 ---------------------------------------------------------------------
class Enemy{
    constructor(){
        this.position = new Point();
        this.size = 0;
        this.type = 0;
        this.param = 0;
        this.alive = false;
    }
    EnemySet(p, size, type){
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

    EnemyMove(){
        // パラメータをインクリメント
    this.param++;

    switch(this.type){
        case 1:
            this.position.x += 2;
            if(this.position.x > screenCanvas.width + this.size){
                this.alive = false;
            }
            break;
        case 2:
            this.position.x -= 2;
            if(this.position.x < -this.size){
                this.alive = false;
            }
            break;
        }
    }
}

// 敵キャラクターの弾幕の設定
class EnemyShot{
    constructor(){
        this.position = new Point();
        this.vector = new Point();
        this.size = 0;
        this.speed = 0;
        this.alive = false;
    }

    EnemyShotSet(p, vector, size, speed){
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

    EnemyShotMove(){
        
        this.position.x += this.vector.x * this.speed;
        this.position.y += this.vector.y * this.speed;
        
        
        if(
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
        ){
            this.alive = false;
            // console.log("EnemyShotMove false");
        }
    }
}