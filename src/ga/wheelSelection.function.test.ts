import {
  sortAndReturnIndexes,
  wheelSelection,
} from "./wheelSelection.function";

it("should return the sorted array and the indexes", () => {
  const test = [2, 3, 4, 1];
  const { sorted, indexes } = sortAndReturnIndexes(test);
  expect(sorted).toEqual([1, 2, 3, 4]);
  expect(indexes).toEqual([3, 0, 1, 2]);
});

it("should return the best according to the probability", () => {
  const weights = [5, 1, 26, 1, 30, 22];

  const selected = wheelSelection(weights);

  expect(selected).toEqual(expect.any(Number));
});
