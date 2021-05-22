import { Enemy } from "../class/Enemy";

// 挙動不審----------------------------
const move = (object: Enemy) => {
  object.position.y += 1;
  let LR = Math.floor(Math.random() * 2);
  if (LR) {
    object.position.x += 5;
  } else {
    object.position.x -= 5;
  }
};
// ------------------------------------
