import gameModel from './model';
import gameView from './view';

class GameController {
  constructor() {
    this.gameView = gameView;
    this.gameModel = gameModel;
    this.gameModel.stageChanged.attach((sender, args) => {
      const stageName = args.stage;
      console.log('stage changed', stageName);
      switch (stageName) {
        case 'game-over':
          this.gameView.showGameOverPage();
          break;
        case 'game':
          this.gameView.showGamePage();
          break;
        default:
      }
    });
  }

  initPages(canvas) {
    const gamePageCallbacks = {
      showGameOverPage: () => {
        this.gameModel.setStage('game-over');
      },
    };
    const gameOverPagesCallbacks = {
      gameRestart: () => {
        this.gameModel.setStage('game');
      },
    };
    this.gameView.initGamePage(gamePageCallbacks, canvas);
    this.gameView.initGameOverPage(gameOverPagesCallbacks, canvas);
    this.gameModel.setStage('game');
  }
}

export default new GameController();
