console.clear();

const accurateTimer = (fn, time = 1000) => {
  let nextAt, timeout;
  nextAt = new Date().getTime() + time;
  const wrapper = () => {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    fn();
  };
  const cancel = () => clearTimeout(timeout);
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return { cancel };
};


let timer, on = false, elapsedSeconds = 0;

const startTimer = () => {
  if(on) return;
  timer = accurateTimer(() => {
    elapsedSeconds++;
    on = true;
    let minutes = Math.floor(elapsedSeconds / 60),
      seconds = elapsedSeconds % 60;
    seconds = seconds > 9 ? seconds : `0${seconds}`
    document.getElementById('timer').innerHTML = `${minutes}:${seconds}`;
    console.log(`${elapsedSeconds} seconds have passed.`);
  });
};

const stopTimer = () => {
  if (on) console.log('Timer Stopped');
  on = false;
  timer.cancel();
};

const resetTimer = () => {
  if (!on) {
    if (elapsedSeconds !== 0) console.log('Timer Reset');
    elapsedSeconds = 0;
    document.getElementById('timer').innerHTML = '0:00';
  };
};