import { canvas, mouse } from "../init/variable";

const mouseMove = (event: MouseEvent): void => {
  mouse.x = event.clientX - canvas.offsetLeft;
  mouse.y = event.clientY - canvas.offsetTop;
};

export { mouseMove };
