const calculateTeamScore =
  (players: number[]) => (acc: number, currentValue: number) =>
    acc + players[currentValue];

export const calculateFitness = (
  population: number[][],
  players: number[]
): number[] => {
  const totalPlayers = population[0].length;
  const teamSize = totalPlayers / 2;
  const maxScore = teamSize * 10 - teamSize;
  const scores: number[] = [];

  population.forEach((team: number[]) => {
    const firstTeamScore = team
      .slice(0, teamSize)
      .reduce(calculateTeamScore(players), 0);
    const secondTeamScore = team
      .slice(teamSize, totalPlayers)
      .reduce(calculateTeamScore(players), 0);

    scores.push(maxScore - Math.abs(firstTeamScore - secondTeamScore));
  });
  return scores;
};
