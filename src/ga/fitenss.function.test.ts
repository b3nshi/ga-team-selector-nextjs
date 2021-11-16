import { calculateFitness } from "./fitness.function";

it("should calculate the proper score", () => {
  const population = [
    [1, 0, 2, 3, 4, 5],
    [3, 1, 4, 0, 2, 5],
  ];

  const players = [3, 2, 5, 5, 4, 2];

  const scores = calculateFitness(population, players);

  expect(scores).toEqual([26, 26]);
});
