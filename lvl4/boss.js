'use strict';

class Boss {
    constructor(){
        this.position = new Point();
        this.size = 0;
        this.life = 0;
        this.param = 0;
        this.alive = false;
    }

    BossSet(p, size, life){
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

    BossMove(){
        let i, j;
        // パラメータのインクリメント
        this.param++;

        // パラメータに応じて分岐処理
        switch(true){
            case this.param < 100:
                // 下方向へまっすぐすすむ
                this.position.y += 1.5;
                break;
            default:
                // パラメータからラジアンを求める
                i = ((this.param - 100) % 360) * Math.PI / 180;

                // ラジアンから横移動量を測定
                j = screenCanvas.width / 2;
                this.position.x = j + Math.sin(i) * j;
                break;
        }
    }
};

// ボスの周りのビットの設定
class Bit{
    constructor(){
        this.position = new Point();
        this.parent = null;
        this.size = 0;
        this.life = 0;
        this.param = 0;
        this.alive = false;
    }

    BitSet(parent, size, life, param){
        // 母体となるボスをセット
        this.parent = parent;
        
        // サイズと体力（耐久値）を設定
        this.size = size;
        this.life = life;

        // パラメータをセット 
        this.param = param;

        // 出現させる（生死フラグを立てる）
        this.alive = true;
    }

    BitMove(){
        let i, x, y;

        this.param++;
	
	i = (this.param % 360) * Math.PI / 180;
	
	x = Math.cos(i) * (this.parent.size + this.size);
	y = Math.sin(i) * (this.parent.size + this.size);
	this.position.x = this.parent.position.x + x;
	this.position.y = this.parent.position.y + y;
    }
};