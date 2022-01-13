export const GAME_TYPES = {
  'Football 5/6/7': 1,
  'Football 8/9/10/11': 1,
  Paddle: 1,
} as const;

export const USER_GAMES_COLLECTION = 'userGames';

export class UserGame {
  userId: string;
  gameType: string;
  score: number;

  constructor(userId, gameType, score) {
    this.userId = userId;
    this.gameType = gameType;
    this.score = score;
  }

  toString() {
    return this.gameType + ': ' + this.score;
  }

  toDTO() {
    return {
      userId: this.userId,
      gameType: this.gameType,
      score: this.score,
    };
  }
}

export const userGameConverter = {
  toFirestore: (userGame) => {
    return {
      userId: userGame.userId,
      gameType: userGame.gameType,
      score: userGame.score,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new UserGame(data.userId, data.gameType, data.score);
  },
};

export const mapUserGamesToDTO = (userGames): UserGame[] => {
  return userGames.map((doc) => {
    console.log(doc);
    const userGame = doc.data();
    console.log(userGame);
    return new UserGame(userGame.userId, userGame.gameType, userGame.score);
  });
};
