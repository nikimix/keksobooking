const getRandomIntNumber = function (minValue, maxValue) {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  return randomNumber;
};
getRandomIntNumber(0,30);

const getRandomFloatNumber = function (minValue, maxValue, digits = 1) {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.random() * (maxValue - minValue) + minValue;
  return randomNumber.toFixed(digits);
};
getRandomFloatNumber (0,30,3);
