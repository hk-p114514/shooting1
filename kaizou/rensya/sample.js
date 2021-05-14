// 挙動不審----------------------------
this.position.y += 1;
let LR = Math.floor(Math.random() * 2);
if(LR){
	this.position.x += 5;
}else{
	this.position.x -= 5;
}
// ------------------------------------