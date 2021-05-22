import { keyState } from "../init/variable";

const keyUp = (event: KeyboardEvent) => {
  let k = event.key;

  if (k === "ArrowLeft") {
    keyState.left = false;
  }

  if (k === "ArrowRight") {
    keyState.right = false;
  }

  if (k === "ArrowUp") {
    keyState.top = false;
  }

  if (k === "ArrowDown") {
    keyState.bottom = false;
  }

  event.preventDefault();
  return;
};

export { keyUp };
