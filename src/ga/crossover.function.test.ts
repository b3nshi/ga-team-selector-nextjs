import { crossover } from "./crossover.function";

describe("Test cross function", function () {
  beforeEach(() => {
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.2073777887129339)
      .mockReturnValueOnce(0.8073777887129339);
  });

  it("should cross two elements", () => {
    const backupRandom = Math.random;
    const population = [
      [1, 0, 2, 3, 4, 5],
      [3, 1, 4, 0, 2, 5],
    ];

    const percentage = 0.5;

    const newPopulation = crossover(population, percentage, 4);
    expect(newPopulation[2]).toEqual([1, 3, 0, 2, 4, 5]);
    expect(newPopulation[3]).toEqual([1, 3, 0, 4, 2, 5]);
    Math.random = backupRandom;
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });
});
