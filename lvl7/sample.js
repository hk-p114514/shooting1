var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;
var counter = 0;
var score = 0;
var message = '';
var radian = new Array();

// - const --------------------------------------------------------------------
var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var ENEMY_COLOR = 'rgba(255, 0, 0, 0.75)';
var ENEMY_MAX_COUNT = 10;
var ENEMY_SHOT_COLOR = 'rgba(255, 0, 255, 0.75)';
var ENEMY_SHOT_MAX_COUNT = 150;
var BOSS_COLOR = 'rgba(128, 128, 128, 0.75)';
var BOSS_BIT_COLOR = 'rgba(64, 64, 64, 0.75)';
var BOSS_BIT_COUNT = 5;

// - main ---------------------------------------------------------------------
window.onload = function(){
	// 豎守畑螟画焚
	var i, j, k, l;
	var p = new Point();
	var q = new Point();
	var enemySize = 0;
	
	// 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ縺ｮ蛻晄悄蛹�
	screenCanvas = document.getElementById('screen');
	screenCanvas.width = 256;
	screenCanvas.height = 256;
	
	// 閾ｪ讖溘�蛻晄悄菴咲ｽｮ繧剃ｿｮ豁｣
	mouse.x = screenCanvas.width / 2;
	mouse.y = screenCanvas.height - 20;
	
	// 2d繧ｳ繝ｳ繝�く繧ｹ繝�
	ctx = screenCanvas.getContext('2d');
	
	// 繧､繝吶Φ繝医�逋ｻ骭ｲ
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	screenCanvas.addEventListener('mousedown', mouseDown, true);
	window.addEventListener('keydown', keyDown, true);
	
	// 縺昴�莉悶�繧ｨ繝ｬ繝｡繝ｳ繝磯未騾｣
	info = document.getElementById('info');
	
	// 繝ｩ繧ｸ繧｢繝ｳ繧帝�蛻励↓縺ゅｉ縺九§繧∬ｨ育ｮ励＠縺ｦ蜈･繧後※縺翫￥
	for(i = 0; i < 360; i++){
		radian[i] = i * Math.PI / 180;
	}
	
	// 閾ｪ讖溷�譛溷喧
	var chara = new Character();
	chara.init(10);
	
	// 閾ｪ讖溘す繝ｧ繝�ヨ蛻晄悄蛹�
	var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
	for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
		charaShot[i] = new CharacterShot();
	}
	
	// 繧ｨ繝阪Α繝ｼ蛻晄悄蛹�
	var enemy = new Array(ENEMY_MAX_COUNT);
	for(i = 0; i < ENEMY_MAX_COUNT; i++){
		enemy[i] = new Enemy();
	}
	
	// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ蛻晄悄蛹�
	var enemyShot = new Array(ENEMY_SHOT_MAX_COUNT);
	for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
		enemyShot[i] = new EnemyShot();
	}
	
	// 繝懊せ蛻晄悄蛹�
	var boss = new Boss();
	
	// 繝懊せ縺ｮ繝薙ャ繝医ｒ蛻晄悄蛹�
	var bit = new Array(BOSS_BIT_COUNT);
	for(i = 0; i < BOSS_BIT_COUNT; i++){
		bit[i] = new Bit();
	}
	
	// 繝ｬ繝ｳ繝繝ｪ繝ｳ繧ｰ蜃ｦ逅�ｒ蜻ｼ縺ｳ蜃ｺ縺�
	(function(){
		// 繧ｫ繧ｦ繝ｳ繧ｿ繧偵う繝ｳ繧ｯ繝ｪ繝｡繝ｳ繝�
		counter++;
		
		// screen繧ｯ繝ｪ繧｢
		ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
		
		// 閾ｪ讖� ---------------------------------------------------------------
		// 繝代せ縺ｮ險ｭ螳壹ｒ髢句ｧ�
		ctx.beginPath();
		
		// 閾ｪ讖溘�菴咲ｽｮ繧定ｨｭ螳�
		chara.position.x = mouse.x;
		chara.position.y = mouse.y;
		
		// 閾ｪ讖溘ｒ謠上￥繝代せ繧定ｨｭ螳�
		ctx.arc(
			chara.position.x,
			chara.position.y,
			chara.size,
			0, Math.PI * 2, false
		);
		
		// 閾ｪ讖溘�濶ｲ繧定ｨｭ螳壹☆繧�
		ctx.fillStyle = CHARA_COLOR;
		
		// 閾ｪ讖溘ｒ謠上￥
		ctx.fill();
		
		// fire繝輔Λ繧ｰ縺ｮ蛟､縺ｫ繧医ｊ蛻�ｲ�
		if(fire){
			// 縺吶∋縺ｦ縺ｮ閾ｪ讖溘す繝ｧ繝�ヨ繧定ｪｿ譟ｻ縺吶ｋ
			for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
				// 閾ｪ讖溘す繝ｧ繝�ヨ縺梧里縺ｫ逋ｺ蟆�＆繧後※縺�ｋ縺九メ繧ｧ繝�け
				if(!charaShot[i].alive){
					// 閾ｪ讖溘す繝ｧ繝�ヨ繧呈眠隕上↓繧ｻ繝�ヨ
					charaShot[i].set(chara.position, 3, 6);
					
					// 繝ｫ繝ｼ繝励ｒ謚懊￠繧�
					break;
				}
			}
			// 繝輔Λ繧ｰ繧帝剄繧阪＠縺ｦ縺翫￥
			fire = false;
		}
		
		// 閾ｪ讖溘す繝ｧ繝�ヨ -------------------------------------------------------
		// 繝代せ縺ｮ險ｭ螳壹ｒ髢句ｧ�
		ctx.beginPath();
		
		// 縺吶∋縺ｦ縺ｮ閾ｪ讖溘す繝ｧ繝�ヨ繧定ｪｿ譟ｻ縺吶ｋ
		for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
			// 閾ｪ讖溘す繝ｧ繝�ヨ縺梧里縺ｫ逋ｺ蟆�＆繧後※縺�ｋ縺九メ繧ｧ繝�け
			if(charaShot[i].alive){
				// 閾ｪ讖溘す繝ｧ繝�ヨ繧貞虚縺九☆
				charaShot[i].move();
				
				// 閾ｪ讖溘す繝ｧ繝�ヨ繧呈緒縺上ヱ繧ｹ繧定ｨｭ螳�
				ctx.arc(
					charaShot[i].position.x,
					charaShot[i].position.y,
					charaShot[i].size,
					0, Math.PI * 2, false
				);
				
				// 繝代せ繧偵＞縺｣縺溘ｓ髢峨§繧�
				ctx.closePath();
			}
		}
		
		// 閾ｪ讖溘す繝ｧ繝�ヨ縺ｮ濶ｲ繧定ｨｭ螳壹☆繧�
		ctx.fillStyle = CHARA_SHOT_COLOR;
		
		// 閾ｪ讖溘す繝ｧ繝�ヨ繧呈緒縺�
		ctx.fill();
		
		// 繧ｨ繝阪Α繝ｼ縺ｮ蜃ｺ迴ｾ邂｡逅� -------------------------------------------------
		if(counter < 1400){
			switch(true){
				// 繧ｫ繧ｦ繝ｳ繧ｿ縺�600縺ｾ縺ｧ縺ｯ繧ｿ繧､繝�0縺ｨ繧ｿ繧､繝�1縺ｮ謨ｵ繧貞�迴ｾ縺輔○繧�
				case counter < 600:
					if(counter % 100 === 0){
						// 縺吶∋縺ｦ縺ｮ繧ｨ繝阪Α繝ｼ繧定ｪｿ譟ｻ縺吶ｋ
						for(i = 0; i < ENEMY_MAX_COUNT; i++){
							// 繧ｨ繝阪Α繝ｼ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
							if(!enemy[i].alive){
								// 繧ｿ繧､繝励ｒ豎ｺ螳壹☆繧九ヱ繝ｩ繝｡繝ｼ繧ｿ繧堤ｮ怜�
								j = (counter % 200) / 100;
								
								// 繧ｿ繧､繝励↓蠢懊§縺ｦ蛻晄悄菴咲ｽｮ繧呈ｱｺ繧√ｋ
								enemySize = 15;
								p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
								p.y = screenCanvas.height / 2;
								
								// 繧ｨ繝阪Α繝ｼ繧呈眠隕上↓繧ｻ繝�ヨ
								enemy[i].set(p, enemySize, j);
								
								// 1菴灘�迴ｾ縺輔○縺溘�縺ｧ繝ｫ繝ｼ繝励ｒ謚懊￠繧�
								break;
							}
						}
					}
					break;
				// 繧ｫ繧ｦ繝ｳ繧ｿ縺�1300縺ｾ縺ｧ縺ｯ繧ｿ繧､繝�2縺ｨ繧ｿ繧､繝�3縺ｮ謨ｵ繧貞�迴ｾ縺輔○繧�
				case counter < 1300:
					if(counter % 50 === 0){
						if(counter % 200 < 100){
							// 縺吶∋縺ｦ縺ｮ繧ｨ繝阪Α繝ｼ繧定ｪｿ譟ｻ縺吶ｋ
							for(i = 0; i < ENEMY_MAX_COUNT; i++){
								// 繧ｨ繝阪Α繝ｼ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
								if(!enemy[i].alive){
									// 繧ｿ繧､繝励ｒ豎ｺ螳壹☆繧九ヱ繝ｩ繝｡繝ｼ繧ｿ繧堤ｮ怜�
									enemySize = 15;
									if(counter % 400 < 200){
										j = 2;
										p.x = screenCanvas.width / 3;
										p.y = -enemySize;
									}else{
										j = 3;
										p.x = screenCanvas.width - screenCanvas.width / 3;
										p.y = -enemySize;
									}
									
									// 繧ｨ繝阪Α繝ｼ繧呈眠隕上↓繧ｻ繝�ヨ
									enemy[i].set(p, enemySize, j);
									
									// 1菴灘�迴ｾ縺輔○縺溘�縺ｧ繝ｫ繝ｼ繝励ｒ謚懊￠繧�
									break;
								}
							}
						}
					}
					break;
			}
		}else if(counter === 1400){
			// 1400 繝輔Ξ繝ｼ繝�逶ｮ縺ｫ繝懊せ繧貞�迴ｾ縺輔○繧�
			p.x = screenCanvas.width / 2;
			p.y = -80;
			boss.set(p, 50, 30);
			
			// 蜷梧凾縺ｫ繝薙ャ繝医ｂ蜃ｺ迴ｾ縺輔○繧�
			for(i = 0; i < BOSS_BIT_COUNT; i++){
				j = 360 / BOSS_BIT_COUNT;
				bit[i].set(boss, 15, 5, i * j);
			}
		}
		
		// 繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ縺ｮ蛟､縺ｫ繧医▲縺ｦ繧ｷ繝ｼ繝ｳ蛻�ｲ�
		switch(true){
			// 繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ縺�70繧医ｊ蟆上＆縺�
			case counter < 70:
				message = 'READY...';
				break;
			
			// 繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ縺�100繧医ｊ蟆上＆縺�
			case counter < 100:
				message = 'GO!!';
				break;
			
			// 繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ縺�100莉･荳�
			default:
				message = '';
				
				// 繧ｨ繝阪Α繝ｼ ---------------------------------------------------
				// 繝代せ縺ｮ險ｭ螳壹ｒ髢句ｧ�
				ctx.beginPath();
				
				// 縺吶∋縺ｦ縺ｮ繧ｨ繝阪Α繝ｼ繧定ｪｿ譟ｻ縺吶ｋ
				for(i = 0; i < ENEMY_MAX_COUNT; i++){
					// 繧ｨ繝阪Α繝ｼ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
					if(enemy[i].alive){
						// 繧ｨ繝阪Α繝ｼ繧貞虚縺九☆
						enemy[i].move();
						
						// 繧ｨ繝阪Α繝ｼ繧呈緒縺上ヱ繧ｹ繧定ｨｭ螳�
						ctx.arc(
							enemy[i].position.x,
							enemy[i].position.y,
							enemy[i].size,
							0, Math.PI * 2, false
						);
						
						// 繧ｷ繝ｧ繝�ヨ繧呈遠縺､縺九←縺�°繝代Λ繝｡繝ｼ繧ｿ縺ｮ蛟､縺九ｉ繝√ぉ繝�け
						if(enemy[i].param % 15 === 0){
							// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧定ｪｿ譟ｻ縺吶ｋ
							for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
								if(!enemyShot[j].alive){
									// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧呈眠隕上↓繧ｻ繝�ヨ縺吶ｋ
									p = enemy[i].position.distance(chara.position);
									p.normalize();
									enemyShot[j].set(enemy[i].position, p, 5, 6);
									
									// 1蛟句�迴ｾ縺輔○縺溘�縺ｧ繝ｫ繝ｼ繝励ｒ謚懊￠繧�
									break;
								}
							}
						}
						
						// 繝代せ繧偵＞縺｣縺溘ｓ髢峨§繧�
						ctx.closePath();
					}
				}
				
				// 繧ｨ繝阪Α繝ｼ縺ｮ濶ｲ繧定ｨｭ螳壹☆繧�
				ctx.fillStyle = ENEMY_COLOR;
				
				// 繧ｨ繝阪Α繝ｼ繧呈緒縺�
				ctx.fill();
				
				// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ -------------------------------------------
				// 繝代せ縺ｮ險ｭ螳壹ｒ髢句ｧ�
				ctx.beginPath();
				
				// 縺吶∋縺ｦ縺ｮ繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧定ｪｿ譟ｻ縺吶ｋ
				for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
					// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ縺梧里縺ｫ逋ｺ蟆�＆繧後※縺�ｋ縺九メ繧ｧ繝�け
					if(enemyShot[i].alive){
						// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧貞虚縺九☆
						enemyShot[i].move();
						
						// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧呈緒縺上ヱ繧ｹ繧定ｨｭ螳�
						ctx.arc(
							enemyShot[i].position.x,
							enemyShot[i].position.y,
							enemyShot[i].size,
							0, Math.PI * 2, false
						);
						
						// 繝代せ繧偵＞縺｣縺溘ｓ髢峨§繧�
						ctx.closePath();
					}
				}
				
				// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ縺ｮ濶ｲ繧定ｨｭ螳壹☆繧�
				ctx.fillStyle = ENEMY_SHOT_COLOR;
				
				// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧呈緒縺�
				ctx.fill();
				
				// 繝懊せ -------------------------------------------------------
				// 繝代せ縺ｮ險ｭ螳壹ｒ髢句ｧ�
				ctx.beginPath();
				
				// 繝懊せ縺ｮ蜃ｺ迴ｾ繝輔Λ繧ｰ繧偵メ繧ｧ繝�け
				if(boss.alive){
					// 繝懊せ繧貞虚縺九☆
					boss.move();
					
					// 繝懊せ繧呈緒縺上ヱ繧ｹ繧定ｨｭ螳�
					ctx.arc(
						boss.position.x,
						boss.position.y,
						boss.size,
						0, Math.PI * 2, false
					);
					
					// 繝懊せ縺九ｉ繧ｷ繝ｧ繝�ヨ繧呈茶縺､
					if(boss.param > 100){
						i = boss.param % 150;
						if(i >= 120){
							if(i % 10 === 0){
								p = boss.position.distance(chara.position);
								p.normalize();
								k = 0;
								for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
									if(!enemyShot[j].alive){
										q.x = p.x;
										q.y = p.y;
										l = (360 + (k - 2) * 20) % 360;
										q.rotate(radian[l]);
										enemyShot[j].set(boss.position, q, 7, 3);
										k++;
										if(k > 4){break;}
									}
								}
							}
						}
					}
					
					// 繝代せ繧偵＞縺｣縺溘ｓ髢峨§繧�
					ctx.closePath();
				}
				
				// 繝懊せ縺ｮ濶ｲ繧定ｨｭ螳壹☆繧�
				ctx.fillStyle = BOSS_COLOR;
				
				// 繝懊せ繧呈緒縺�
				ctx.fill();
				
				// 繝薙ャ繝� -------------------------------------------
				// 繝代せ縺ｮ險ｭ螳壹ｒ髢句ｧ�
				ctx.beginPath();
				
				// 縺吶∋縺ｦ縺ｮ繝薙ャ繝医ｒ隱ｿ譟ｻ縺吶ｋ
				for(i = 0; i < BOSS_BIT_COUNT; i++){
					// 繝薙ャ繝医�蜃ｺ迴ｾ繝輔Λ繧ｰ繧偵メ繧ｧ繝�け
					if(bit[i].alive){
						// 繝薙ャ繝医ｒ蜍輔°縺�
						bit[i].move();
						
						// 繝薙ャ繝医ｒ謠上￥繝代せ繧定ｨｭ螳�
						ctx.arc(
							bit[i].position.x,
							bit[i].position.y,
							bit[i].size,
							0, Math.PI * 2, false
						);
						
						// 繧ｷ繝ｧ繝�ヨ繧呈遠縺､縺九←縺�°繝代Λ繝｡繝ｼ繧ｿ縺ｮ蛟､縺九ｉ繝√ぉ繝�け
						if(bit[i].param % 25 === 0){
							// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧定ｪｿ譟ｻ縺吶ｋ
							for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
								if(!enemyShot[j].alive){
									// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ繧呈眠隕上↓繧ｻ繝�ヨ縺吶ｋ
									p = bit[i].position.distance(chara.position);
									p.normalize();
									enemyShot[j].set(bit[i].position, p, 4, 1.5);
									
									// 1蛟句�迴ｾ縺輔○縺溘�縺ｧ繝ｫ繝ｼ繝励ｒ謚懊￠繧�
									break;
								}
							}
						}
						
						// 繝代せ繧偵＞縺｣縺溘ｓ髢峨§繧�
						ctx.closePath();
					}
				}
				
				// 繝薙ャ繝医�濶ｲ繧定ｨｭ螳壹☆繧�
				ctx.fillStyle = BOSS_BIT_COLOR;
				
				// 繝薙ャ繝医ｒ謠上￥
				ctx.fill();
				
				// 陦晉ｪ∝愛螳� ---------------------------------------------------
				// 縺吶∋縺ｦ縺ｮ閾ｪ讖溘す繝ｧ繝�ヨ繧定ｪｿ譟ｻ縺吶ｋ
				for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
					// 閾ｪ讖溘す繝ｧ繝�ヨ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
					if(charaShot[i].alive){
						// 閾ｪ讖溘す繝ｧ繝�ヨ縺ｨ繧ｨ繝阪Α繝ｼ縺ｨ縺ｮ陦晉ｪ∝愛螳�
						for(j = 0; j < ENEMY_MAX_COUNT; j++){
							// 繧ｨ繝阪Α繝ｼ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
							if(enemy[j].alive){
								// 繧ｨ繝阪Α繝ｼ縺ｨ閾ｪ讖溘す繝ｧ繝�ヨ縺ｨ縺ｮ霍晞屬繧定ｨ域ｸｬ
								p = enemy[j].position.distance(charaShot[i].position);
								if(p.length() < enemy[j].size){
									// 陦晉ｪ√＠縺ｦ縺�◆繧臥函蟄倥ヵ繝ｩ繧ｰ繧帝剄繧阪☆
									enemy[j].alive = false;
									charaShot[i].alive = false;
									
									// 繧ｹ繧ｳ繧｢繧呈峩譁ｰ縺吶ｋ縺溘ａ縺ｫ繧､繝ｳ繧ｯ繝ｪ繝｡繝ｳ繝�
									score++;
									
									// 陦晉ｪ√′縺ゅ▲縺溘�縺ｧ繝ｫ繝ｼ繝励ｒ謚懊￠繧�
									break;
								}
							}
						}
						
						// 閾ｪ讖溘す繝ｧ繝�ヨ縺ｨ繝懊せ繝薙ャ繝医→縺ｮ陦晉ｪ∝愛螳�(繝薙ャ繝郁�菴薙�辟｡謨ｵ)
						for(j = 0; j < BOSS_BIT_COUNT; j++){
							// 繧ｨ繝阪Α繝ｼ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
							if(bit[j].alive){
								// 繧ｨ繝阪Α繝ｼ縺ｨ閾ｪ讖溘す繝ｧ繝�ヨ縺ｨ縺ｮ霍晞屬繧定ｨ域ｸｬ
								p = bit[j].position.distance(charaShot[i].position);
								if(p.length() < bit[j].size){
									// 陦晉ｪ√＠縺ｦ縺�◆繧芽蝉ｹ�､繧偵ョ繧ｯ繝ｪ繝｡繝ｳ繝医☆繧�
									bit[j].life--;
									
									// 閾ｪ讖溘す繝ｧ繝�ヨ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧帝剄繧阪☆
									charaShot[i].alive = false;
									
									// 閠蝉ｹ�､縺後�繧､繝翫せ縺ｫ縺ｪ縺｣縺溘ｉ逕溷ｭ倥ヵ繝ｩ繧ｰ繧帝剄繧阪☆
									if(bit[j].life < 0){
										bit[j].alive = false;
										score += 3;
									}
									
									// 陦晉ｪ√′縺ゅ▲縺溘�縺ｧ繝ｫ繝ｼ繝励ｒ謚懊￠繧�
									break;
								}
							}
						}
						
						// 繝懊せ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
						if(boss.alive){
							// 閾ｪ讖溘す繝ｧ繝�ヨ縺ｨ繝懊せ縺ｨ縺ｮ陦晉ｪ∝愛螳�
							p = boss.position.distance(charaShot[i].position);
							if(p.length() < boss.size){
								// 陦晉ｪ√＠縺ｦ縺�◆繧芽蝉ｹ�､繧偵ョ繧ｯ繝ｪ繝｡繝ｳ繝医☆繧�
								boss.life--;
								
								// 閾ｪ讖溘す繝ｧ繝�ヨ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧帝剄繧阪☆
								charaShot[i].alive = false;
								
								// 閠蝉ｹ�､縺後�繧､繝翫せ縺ｫ縺ｪ縺｣縺溘ｉ繧ｯ繝ｪ繧｢
								if(boss.life < 0){
									score += 10;
									run = false;
									message = 'CLEAR !!';
								}
							}
						}
					}
				}
				
				// 閾ｪ讖溘→繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ縺ｨ縺ｮ陦晉ｪ∝愛螳�
				for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
					// 繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ縺ｮ逕溷ｭ倥ヵ繝ｩ繧ｰ繧偵メ繧ｧ繝�け
					if(enemyShot[i].alive){
						// 閾ｪ讖溘→繧ｨ繝阪Α繝ｼ繧ｷ繝ｧ繝�ヨ縺ｨ縺ｮ霍晞屬繧定ｨ域ｸｬ
						p = chara.position.distance(enemyShot[i].position);
						if(p.length() < chara.size){
							// 陦晉ｪ√＠縺ｦ縺�◆繧臥函蟄倥ヵ繝ｩ繧ｰ繧帝剄繧阪☆
							chara.alive = false;
							
							// 陦晉ｪ√′縺ゅ▲縺溘�縺ｧ繝代Λ繝｡繝ｼ繧ｿ繧貞､画峩縺励※繝ｫ繝ｼ繝励ｒ謚懊￠繧�
							run = false;
							message = 'GAME OVER !!';
							break;
						}
					}
				}
				break;
		}
		
		// HTML繧呈峩譁ｰ
		info.innerHTML = 'SCORE: ' + (score * 100) + ' ' + message;
		
		// 繝輔Λ繧ｰ縺ｫ繧医ｊ蜀榊ｸｰ蜻ｼ縺ｳ蜃ｺ縺�
		if(run){setTimeout(arguments.callee, fps);}
	})();
};


// - event --------------------------------------------------------------------
function mouseMove(event){
	// 繝槭え繧ｹ繧ｫ繝ｼ繧ｽ繝ｫ蠎ｧ讓吶�譖ｴ譁ｰ
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
}

function mouseDown(event){
	// 繝輔Λ繧ｰ繧堤ｫ九※繧�
	fire = true;
}

function keyDown(event){
	// 繧ｭ繝ｼ繧ｳ繝ｼ繝峨ｒ蜿門ｾ�
	var ck = event.keyCode;
	
	// Esc繧ｭ繝ｼ縺梧款縺輔ｌ縺ｦ縺�◆繧峨ヵ繝ｩ繧ｰ繧帝剄繧阪☆
	if(ck === 27){run = false;}
}

