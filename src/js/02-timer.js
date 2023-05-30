
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.getElementById('start'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      alert('Please select a date in the future');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

let timer = null;

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  const endDateTime = fp.selectedDates[0];
  const now = new Date();
  let msUntilEnd = endDateTime - now;

  timer = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(msUntilEnd);

    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);

    if (msUntilEnd <= 0) {
      return clearInterval(timer);
    }

    msUntilEnd -= 1000;
  }, 1000);
}

refs.startBtn.addEventListener('click', startTimer);
