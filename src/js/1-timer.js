// Ініціалізація flatpickr
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    const startButton = document.querySelector('[data-start]');
    if (selectedDates[0] && selectedDates[0] > now) {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
  },
};
const dateTimePicker = flatpickr('#datetime-picker', options);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#datetime-picker').disabled = false;
});

// Отримуємо елементи інтерфейсу
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

// Функція для додавання ведучого нуля
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для оновлення таймера
function updateTimer(endTime) {
  const now = new Date().getTime();
  const timeLeft = endTime - now;

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    document.querySelector('#datetime-picker').disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  daysValue.textContent = days;
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

// Функція для конвертації мілісекунд
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Обробник події для кнопки "Start"
startButton.addEventListener('click', () => {
  if (!userSelectedDate || userSelectedDate <= new Date()) {
    iziToast.error({
      title: 'Помилка',
      message: 'Будь ласка, оберіть  дату у майбутньому',
    });
    return;
  }

  // Вимкнення інпуту та кнопки під час відліку
  document.querySelector('#datetime-picker').disabled = true;
  startButton.disabled = true;

  // Запуск таймера
  clearInterval(countdownInterval);
  countdownInterval = setInterval(
    () => updateTimer(userSelectedDate.getTime()),
    1000
  );
});
