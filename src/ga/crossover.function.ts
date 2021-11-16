// This is not a known algorithm, but it is similar to the Uniform Crossover
// Having:
//   A = [ 1, 3, 2, 5, 4 ]
//   B = [ 2, 1, 4, 6, 3 ]
// We initially get:
//   C = [ 1, 2, 3, 1, 2, 4, 5, 6, 4, 3 ]
// Now we remove the duplicated values to get
//   C = [ 1, 2, 3, 4, 5, 6 ]
// So we mix them and get the first non-repeated index from each of them
export const crossover = (
  population: number[][],
  percentageToCross: number,
  totalTeams: number
) => {
  const currentPopulationSize = population.length;
  const totalToCrossover = totalTeams * percentageToCross;

  const selectedIndexes: number[] = [];
  const crossoveredPopulation: number[][] = JSON.parse(
    JSON.stringify(population)
  );

  for (let i = 0; i < totalToCrossover; i += 2) {
    let selectedIndex1: number;
    let selectedIndex2: number;
    do {
      selectedIndex1 = Math.floor(Math.random() * currentPopulationSize);
    } while (selectedIndexes.includes(selectedIndex1));

    selectedIndexes.push(selectedIndex1);

    do {
      selectedIndex2 = Math.floor(Math.random() * currentPopulationSize);
    } while (selectedIndexes.includes(selectedIndex2));

    selectedIndexes.push(selectedIndex2);

    const crossedValues1 = [];
    const crossedValues2 = [];

    const teams2 = population[selectedIndex2];
    population[selectedIndex1].forEach((sel1: number, index: number) => {
      if (!crossedValues1.includes(sel1)) {
        crossedValues1.push(sel1);
      } else {
        crossedValues2.push(sel1);
      }

      const sel2 = teams2[index];

      if (!crossedValues1.includes(sel2)) {
        crossedValues1.push(sel2);
      } else {
        crossedValues2.push(sel2);
      }
    });

    crossoveredPopulation.push(crossedValues1);
    crossoveredPopulation.push(crossedValues2);
  }

  return crossoveredPopulation;
};
