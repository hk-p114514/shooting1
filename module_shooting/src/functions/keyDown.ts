import { canvas, mouse, variables } from "../init/variable";

const keyDown = (event: KeyboardEvent): void => {
  let k = event.key;

  if (k === "ArrowLeft") {
    if (mouse.x < 7) return;
    mouse.x -= 15;
  }

  if (k === "ArrowRight") {
    if (mouse.x < canvas.width - 7) {
      mouse.x += 15;
    }
  }

  if (k === "ArrowUp") {
    if (mouse.y < 7) return;
    mouse.y -= 15;
  }

  if (k === "ArrowDown") {
    if (mouse.y < canvas.height - 7) {
      mouse.y += 15;
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
