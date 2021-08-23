import {
  canvas,
  keyState,
  player,
  UserMouse,
  variables,
} from "../init/variable";

const keyControl = (): void => {
  if (keyState.left) {
    if (UserMouse.x > 7) {
      UserMouse.x -= player.speed;
    }
  }

  if (keyState.right) {
    if (UserMouse.x < canvas.width - 7) {
      UserMouse.x += player.speed;
    }
  }

  if (keyState.top) {
    if (UserMouse.y > 7) {
      UserMouse.y -= player.speed;
    }
  }

  if (keyState.bottom) {
    if (UserMouse.y < canvas.height - 7) {
      UserMouse.y += player.speed;
    }
  }

  if (keyState.fire) {
    variables.fire = true;
  }
};

export { keyControl };
