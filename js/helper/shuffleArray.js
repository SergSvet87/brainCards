export const shuffleArray = (arr) => {
  const array = [...arr];

  for (let index = array.length - 1; index > 0; index--) {
    const i = Math.floor(Math.random() * (index + 1));

    // [array[index], array[i]] = [array[i], array[index]]; //меняем местами массивы с карточками. Этот вариант проще и лучше для чтения

    const a = array[index];
    array[index] = array[i];
    array[i] = a;

    return array;
  }
};
