const refs = {
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name= amount]'),
  btn: document.querySelector('button[type= submit]'),
};

let delay;
let step;
let amount;
let position = 0;

refs.delay.addEventListener('input', onFirstDelay);
refs.step.addEventListener('input', onStepDelay);
refs.amount.addEventListener('input', onAmount);
refs.btn.addEventListener('click', onClick);

function onFirstDelay(e) {
  delay = Number.parseInt(e.target.value);
}

function onStepDelay(e) {
  step = Number.parseInt(e.target.value);
}

function onAmount(e) {
  amount = Number.parseInt(e.target.value);
}

function onClick(e) {
  e.preventDefault();
  position = 1;

  for (let i = 1; i <= amount; i += 1) {
    
    createPromise(position, delay)
  .then(({position, delay}) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(( {position, delay} ) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  position += 1;
  delay += step;
  }

}

function createPromise(position, delay) {


  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    const timeout = setTimeout(() => {

      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});

      }
    }, delay);

  });

}
