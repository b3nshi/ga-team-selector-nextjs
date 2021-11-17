import { crossover } from "./crossover.function";
import { calculateFitness } from "./fitness.function";
import { mutate } from "./mutate.function";
import { selectFitest } from "./select.function";

export const runGeneration = (
  population: number[][],
  players: number[],
  generationSize: number,
  selectionPercentage: number,
  crossoverPercentage: number,
  mutationPercentage: number
) => {
  const weights = calculateFitness(population, players);
  const selectedPopulation = selectFitest(
    population,
    selectionPercentage,
    weights
  );
  const crossedPopulation = crossover(
    selectedPopulation,
    crossoverPercentage,
    generationSize
  );

  const newPopulation = mutate(
    crossedPopulation,
    mutationPercentage,
    generationSize
  );

  return {
    newPopulation,
    scores: weights,
  };
};
