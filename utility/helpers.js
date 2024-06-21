/**
 *
 * @param {Number} num
 */
function getPercentage(num) {
  let numStr = num.toString().split('.')[1].slice(0, 3);
  let percentage;

  if (parseInt(numStr[numStr.length - 1]) >= 5) {
    // round up
    numStr = num.toString().split('.')[1].slice(0, 2);
    let number = parseInt(numStr) + 1;
    percentage = number.toString() + '%';
  } else {
    percentage = numStr.slice(0, 2) + '%';
  }

  if (percentage[0] === '0') {
    return percentage.slice(1);
  }

  return percentage;
}

// let easy = 1 / 8;
// let medium = 1 / 20;
// let hard = 1 / 30;
// console.log(getPercentage(hard));

function getMineCount(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomIndex(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );
}
