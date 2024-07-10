import GameOverPage from '../pages/game-over-page';
import GamePage from '../pages/game-page';
import Event from '../utils/event';

class GameView {
  constructor() {
    this.restartButtonClicked = new Event(this);
  }

  showGameOverPage() {
    // this.gamePage.hide()
    console.log('showGameOverPage');
    this.gameOverPage.show();
  }

  showGamePage() {
    console.log('showGamePage');
    this.gameOverPage.hide();
    this.gamePage.restart();
    this.gamePage.show();
  }

  initGameOverPage(callbacks, canvas) {
    this.gameOverPage = new GameOverPage(callbacks, canvas);
    this.gameOverPage.init({
      camera: this.gamePage.scene.camera.instance,
      scene: this.gamePage.scene.instance,
    });
  }

  initGamePage(callbacks, canvas) {
    this.gamePage = new GamePage(callbacks, canvas);
    this.gamePage.init();
  }
}

export default new GameView();
