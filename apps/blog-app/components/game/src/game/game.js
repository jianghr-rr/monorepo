import gameController from './controller';

class Game {
  constructor() {
    this.gameController = gameController;
  }

  init(canvas) {
    this.gameController.initPages(canvas);
  }
}

export default new Game();
