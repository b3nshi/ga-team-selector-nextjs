import { mutate } from "./mutate.function";

describe("Test mutate function", function () {
  beforeEach(() => {
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.2073777887129339)
      .mockReturnValueOnce(0.3073777887129339)
      .mockReturnValueOnce(0.8073777887129339);
  });

  it("should cross two elements", () => {
    const population = [
      [1, 0, 2, 3, 4, 5],
      [3, 1, 4, 0, 2, 5],
    ];

    const percentage = 0.5;

    const newPopulation = mutate(population, percentage, 4);
    expect(newPopulation[2]).toEqual([5, 0, 2, 3, 4, 1]);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });
});
