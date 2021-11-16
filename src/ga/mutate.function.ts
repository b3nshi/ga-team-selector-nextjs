export const mutate = (
  population: number[][],
  percentageToMutate: number,
  totalTeams: number
) => {
  const currentPopulationSize = population.length;
  const totalToMutate = totalTeams * percentageToMutate;
  const teamSize = population[0].length / 2;

  const selectedIndexes: number[] = [];
  const mutatedPopulation: number[][] = JSON.parse(JSON.stringify(population));

  for (let i = 0; i < totalToMutate; i++) {
    let selectedIndex: number;

    do {
      selectedIndex = Math.floor(Math.random() * currentPopulationSize);
    } while (selectedIndexes.includes(selectedIndex));

    const leftTeamIndex = Math.floor(Math.random() * teamSize);
    const rightTeamIndex = Math.floor(Math.random() * teamSize + teamSize);

    const mutatedTeam = [...population[selectedIndex]];
    mutatedTeam[leftTeamIndex] = population[selectedIndex][rightTeamIndex];
    mutatedTeam[rightTeamIndex] = population[selectedIndex][leftTeamIndex];

    mutatedPopulation.push(mutatedTeam);
  }

  return mutatedPopulation;
};
