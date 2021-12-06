import { Player } from "../shared/interfaces";
import { calculateFitness } from "./fitness.function";
import { runGeneration } from "./generation.function";
import { generateInitialPopulation } from "./initPopulation.function";

export interface GeneticResponse {
  population: number[][];
  scores: number[];
  maxPossibleScore: number;
  maxScore: number;
}

export const runGenetic = (
  generations: number,
  players: Player[],
  generationSize: number,
  selectionPercentage: number,
  crossoverPercentage: number,
  mutationPercentage: number,
  printStats: boolean = false
): GeneticResponse => {
  const AVG_SCORES = [];

  const playersScores = players.map(({ score }) => score);

  let population = generateInitialPopulation(playersScores, generationSize);

  for (let i = 0; i < generations; i++) {
    const { newPopulation, scores } = runGeneration(
      population,
      playersScores,
      generationSize,
      selectionPercentage,
      crossoverPercentage,
      mutationPercentage
    );

    population = newPopulation;

    AVG_SCORES.push(scores);
  }

  if (printStats) {
    console.table(AVG_SCORES);
  }

  const finalScores = calculateFitness(population, playersScores);
  const teamSize = population[0].length / 2;

  return {
    population,
    scores: finalScores,
    maxPossibleScore: teamSize * 10 - teamSize,
    maxScore: Math.max.apply(null, finalScores),
  };
};
