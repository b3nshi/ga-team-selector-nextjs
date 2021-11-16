const shuffleArray = (array: number[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const generateInitialPopulation = (players: number[], total: number) => {
  const totalPlayers = players.length;
  const indexesOfPlayers = Array.from(
    { length: totalPlayers },
    (_, index) => index
  );
  const population: number[][] = [];

  for (let i = 0; i < total; i++) {
    population.push(shuffleArray(indexesOfPlayers));
  }

  return population;
};
