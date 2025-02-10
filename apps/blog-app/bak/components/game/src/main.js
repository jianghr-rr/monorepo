/**
 * 游戏主函数
 */

import game from './game/game.js';

export default class Main {
  constructor(canvas) {
    game.init(canvas);
  }
}
