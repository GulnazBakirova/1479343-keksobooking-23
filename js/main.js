function getRandomInRange(min, max) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInRange(0, 3)


function getRandomFloat(min, max, num) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return (Math.random() * (max - min) + min).toFixed(num);
}
getRandomFloat(1, 3, 3)

