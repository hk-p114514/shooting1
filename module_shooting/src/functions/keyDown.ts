import { canvas, keyState, UserMouse, variables } from "../init/variable";

const keyDown = (event: KeyboardEvent): void => {
  let k = event.key;

  if (k === "ArrowLeft") {
    if (UserMouse.x < 7) return;
    // UserMouse.x -= 15;
    keyState.left = true;
  }

  if (k === "ArrowRight") {
    if (UserMouse.x < canvas.width - 7) {
      keyState.right = true;
    }
  }

  if (k === "ArrowUp") {
    if (UserMouse.y < 7) return;
    keyState.top = true;
  }

  if (k === "ArrowDown") {
    if (UserMouse.y < canvas.height - 7) {
      keyState.bottom = true;
    }
  }

  if (k === "f") {
    variables.fire = true;
  }

  // 中断
  if (k === "Escape") {
    variables.run = false;
  }

  event.preventDefault();
  return;
};

export { keyDown };
