import { runGenetic, Player } from "./genetic.function";

it.skip("should run the generation", () => {
  const players: Player[] = [
    {
      id: 1,
      name: "PlayerA",
      score: 8,
    },
    {
      id: 2,
      name: "PlayerB",
      score: 6,
    },
    {
      id: 3,
      name: "PlayerC",
      score: 7,
    },
    {
      id: 4,
      name: "PlayerD",
      score: 5,
    },
    {
      id: 5,
      name: "PlayerE",
      score: 6,
    },
    {
      id: 6,
      name: "PlayerF",
      score: 7,
    },
  ];

  const { population, scores, maxPossibleScore, maxScore } = runGenetic(
    10,
    players,
    10,
    0.7,
    0.2,
    0.1
  );

  // Now I will convert the population with the maxScore to the players names
  const filteredPopulation = population
    .filter((_, index) => scores[index] === maxScore)
    .map((teams) => teams.map((index) => players[index].name));

  console.log(`Max possible score: ${maxPossibleScore}`);
  console.log(`Max score: ${maxScore}`);
  console.log(filteredPopulation);
  console.log(scores);
});
