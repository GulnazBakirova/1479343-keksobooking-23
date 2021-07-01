function getRandomIntegerInRange(min, max) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomFloat(min, max, num) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return (Math.random() * (max - min) + min).toFixed(num);
}


function chooseAvatar() {
  const i = Math.round(Math.random() * (8 - 1) + 1);
  const link = `img/avatars/user0 + ${i} + .png`;
  return link;
}


function getFirst(array) {
  if (!array) {
    return [];
  }
  const n = getRandomIntegerInRange(0, array.length - 1);
  return array.slice(0, n);
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerInRange(0, elements.length - 1)];
};

export {getRandomIntegerInRange, getRandomFloat, chooseAvatar, getFirst, getRandomArrayElement};
