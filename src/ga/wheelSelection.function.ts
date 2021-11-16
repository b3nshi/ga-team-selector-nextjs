interface SortedArray {
  sorted: number[];
  indexes: number[];
}

export const sortAndReturnIndexes = (toSort: number[]): SortedArray => {
  const sorted: number[][] = toSort.map((weight: number, index: number) => [
    weight,
    index,
  ]);

  sorted.sort(function (left, right) {
    return left[0] < right[0] ? -1 : 1;
  });

  const response: SortedArray = {
    sorted: [],
    indexes: [],
  };

  return sorted.reduce((acc: SortedArray, currentValue: number[]) => {
    acc.sorted.push(currentValue[0]);
    acc.indexes.push(currentValue[1]);

    return acc;
  }, response);
};

export const wheelSelection = (weights: number[]) => {
  const { sorted, indexes } = sortAndReturnIndexes(weights);

  const totalWeights = weights.length;

  const accumulation: number[] = sorted.reduce(
    (acc: number[], currentValue: number, index: number) => {
      let value = currentValue;
      if (index > 0) {
        value += acc[index - 1];
      }
      acc.push(value);
      return acc;
    },
    []
  );

  const p = Math.random() * accumulation[totalWeights - 1];

  for (let i = 0; i < totalWeights; i++) {
    if (accumulation[i] > p) {
      return indexes[i];
    }
  }
};
