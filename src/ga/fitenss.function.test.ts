import { calculateFitness } from "./fitness.function";

it("should calculate the proper score", () => {
  const population = [
    [2, 1, 3, 4, 5, 6],
    [4, 2, 5, 1, 3, 6],
  ];

  const players = [3, 2, 5, 5, 4, 2];

  const scores = calculateFitness(population, players);

  expect(scores).toEqual([26, 26]);
});
