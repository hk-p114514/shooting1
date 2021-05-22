import { constants, player, playerShot, variables } from "../init/variable";

const fire = (): void => {
  // vars.fire（真偽値）により発射の分岐
  if (variables.fire) {
    // キーボード(f)が押されたら
    for (let i = 0; i < constants.playerShotMaxCount; i++) {
      if (!playerShot[i].alive) {
        // playerShot[i]が生存していなかったら
        playerShot[i].CharacterShotSet(player.position, 3, 7);
        break;
      }
    }
    variables.fire = false;
  }
};

export { fire };
