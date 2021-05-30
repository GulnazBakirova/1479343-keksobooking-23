function getRandomInRange(min, max) {
  if (max <= min) {
    console.log ('Слишком маленькое число!');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function getRandomFloat(min, max, num) {
  if (max <= min) {
    console.log ('Слишком маленькое число!');
  }
  console.log (Math.random() * (max - min) + min, (Math.random() * (max - min) + min).toFixed(num));
};

