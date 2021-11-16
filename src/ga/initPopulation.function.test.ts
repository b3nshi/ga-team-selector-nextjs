import { generateInitialPopulation } from "./initPopulation.function";

it("should generate a random population", () => {
  const players = [3, 2, 5, 5, 4, 2];

  const initialPopulation = generateInitialPopulation(players, 4);

  expect(initialPopulation.length).toEqual(4);
  expect(initialPopulation[0].length).toEqual(6);
});
