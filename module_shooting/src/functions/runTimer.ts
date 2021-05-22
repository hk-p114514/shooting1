import { time, variables } from "../init/variable";

const runTimer = () => {
  if (time !== null) {
    time.textContent = ((Date.now() - variables.startTime) / 1000).toFixed(2);
  }
  variables.timeOutId = setTimeout(() => {
    runTimer();
  });
};

export { runTimer };
