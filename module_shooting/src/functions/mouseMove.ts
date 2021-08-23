import { canvas, UserMouse } from "../init/variable";

const mouseMove = (event: MouseEvent): void => {
  UserMouse.x = event.clientX - canvas.offsetLeft;
  UserMouse.y = event.clientY - canvas.offsetTop;
};

export { mouseMove };
