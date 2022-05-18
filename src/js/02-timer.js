// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let startTime = null;
let currentTime = null;
let deltaTime = null;
let timer = null;

const inputCalendarDate = flatpickr(refs.inputDate, options);

refs.inputDate.addEventListener('input', onInput);
refs.startBtn.addEventListener('click', onStartClick);

makeBtnOff(refs.startBtn);

function onInput() {
  // находим разницу во времени и проверяем будущее или нет. если да - включаем кнопку
  findDeltaTime();

  if (deltaTime < 0) {
    return window.alert('Please choose a date in the future');
  }

  makeBtnOn(refs.startBtn);
}

function onStartClick() {
  // запускаем интервал и находим разницу во времени, если >0, то очищаем интервал. каждый раз обновляем таймер
  const countTime = setInterval(() => {
    findDeltaTime();

    if (deltaTime == 0 || deltaTime < 0) {
      clearInterval(countTime);
      return;
    }

    timer = convertMs(deltaTime);
    updateCloclface(timer);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function makeBtnOff(e) {
  e.setAttribute('disabled', '');
}

function makeBtnOn(e) {
  e.removeAttribute('disabled');
}

function updateCloclface({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = `${days}`;
  refs.hoursSpan.textContent = `${hours}`;
  refs.minutesSpan.textContent = `${minutes}`;
  refs.secondsSpan.textContent = `${seconds}`;
}

function findDeltaTime() {
  startTime = inputCalendarDate.selectedDates[0].getTime();
  currentTime = Date.now();
  deltaTime = startTime - currentTime;
}
