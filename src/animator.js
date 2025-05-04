export function simulatePath(robot, path) {
    return new Promise(async (resolve) => {
      for (let i = 1; i < path.length; i++) {
        const [x, y] = path[i];
        await new Promise((r) => {
          new TWEEN.Tween(robot.position)
            .to({ x: x, z: y }, 300)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(r)
            .start();
        });
      }
      resolve();
    });
  }
  