import { wheelSelection } from "./wheelSelection.function";

export const selectFitest = (
  population: number[][],
  percentage: number,
  weights: number[]
) => {
  const totalTeams = population.length;
  const totalToSelect = totalTeams * percentage;
  const selectedIndexes: number[] = [];
  const selectedPopulation: number[][] = [];

  for (let i = 0; i < totalToSelect; i++) {
    let selectedIndex: number;
    do {
      selectedIndex = wheelSelection(weights);
    } while (selectedIndexes.includes(selectedIndex));

    selectedPopulation.push([...population[selectedIndex]]);
    selectedIndexes.push(selectedIndex);
  }

  return selectedPopulation;
};
