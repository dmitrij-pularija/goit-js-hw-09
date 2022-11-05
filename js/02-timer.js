import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
  dataTime: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
};
let timePoint = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
  },
  dateFormat: "d.m.Y  H:i",
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= Date.now()) {
      Notify.failure("❌ Please choose a date in the future", {
        useIcon: false,
        position: "center-top",
      });
    } else {
      refs.startBtn.disabled = false;
      timePoint = selectedDates[0];
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

class Timer {
  constructor() {
    this.timerID = null;
    refs.startBtn.disabled = true;
  }

  startCnt() {
    refs.startBtn.disabled = true;
    refs.dataTime.disabled = true;
    this.timerID = setInterval(() => {
      const calcTime = timePoint - Date.now();
      this.updateField(convertMs(calcTime));
      if (calcTime < 1000) {
        this.stopCnt();
      }
    }, 1000);
  }

  updateField({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  stopCnt() {
    clearInterval(this.timerID);
    setTimeout(() => {
      document.querySelector(".box").remove();
      document
        .querySelector("p")
        .insertAdjacentHTML(
          "afterend",
          '<div class="box textbox">Time is up!</div>'
        );
    }, 350);
  }
}
const timer = new Timer();

flatpickr(refs.dataTime, options);
refs.startBtn.addEventListener("click", () => timer.startCnt());
