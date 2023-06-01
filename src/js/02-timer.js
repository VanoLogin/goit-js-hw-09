import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
//----------------------------------------------------------------
const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.getElementById('start'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
//-`
refs.startBtn.disabled = true;

let timer = null;
//-----`//

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        Notiflix.Report.warning('Oops', 'Choose the date in the future', 'Got it!');
        refs.startBtn.disabled = true;
    } else {
        refs.startBtn.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

//---------------------------// 
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
//----------------------------------------------------------------

function countdown(){
    timer = setInterval(setTime, 1000)
}
function setTime() {
  const endDateTime = fp.selectedDates[0];
  const now = new Date();
  let msUntilEnd = endDateTime - now;
  
  if ( msUntilEnd < 1000) {
    clearInterval(timer);
    Notiflix.Report.success('Time is up', 'Countdown is over', 'ok');
}
  
    const { days, hours, minutes, seconds } = convertMs(msUntilEnd);

    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);

  refs.startBtn.disabled = true;
}

refs.startBtn.addEventListener('click', countdown);
