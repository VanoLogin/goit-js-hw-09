function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const initialBackgroundColor = document.body.style.backgroundColor; 

const startButton = document.getElementById('data-start');
const stopButton = document.getElementById('data-stop');
const returnButton = document.getElementById('data-return');

startButton.addEventListener('click', () => {
  startButton.disabled = true;

  const interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  stopButton.addEventListener('click', () => {
    clearInterval(interval);
    startButton.disabled = false;
    
  });
  returnButton.addEventListener('click', () => {
    clearInterval(interval);
    startButton.disabled = false;
    return document.body.style.backgroundColor = initialBackgroundColor;
});
});


