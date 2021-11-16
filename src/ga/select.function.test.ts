import { selectFitest } from "./select.function";

it("should select the fitest", () => {
  const population = [
    [1, 0, 2, 3, 4, 5],
    [3, 1, 4, 0, 2, 5],
  ];

  const percentage = 0.5;
  const weights = [26, 26];

  const newPopulation = selectFitest(population, percentage, weights);

  expect(newPopulation.length).toEqual(1);
});
