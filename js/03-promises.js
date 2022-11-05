import { Notify } from "notiflix/build/notiflix-notify-aio";

const form = document.querySelector(".form");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objPromise = { position, delay };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(objPromise);
      } else {
        reject(objPromise);
      }
    }, delay);
  });
}

function submit(event) {
  event.preventDefault();

  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          useIcon: false,
          cssAnimationStyle: "zoom",
          timeout: 1000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          useIcon: false,
          cssAnimationStyle: "zoom",
          timeout: 1000,
        });
      });
    delay += step;
  }
}

form.addEventListener("submit", submit);
