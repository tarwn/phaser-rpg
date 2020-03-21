import * as Phaser from 'phaser';

class Game extends Phaser.Game {
  constructor()
  {
    super({
      width: 800,
      height: 600,
      scene: [Level1]
    })
  }
}

class Level1 extends Phaser.Scene {
  pika!: Phaser.GameObjects.Sprite;

  constructor()
  {
    super('Level1');
  }

  preload() {
    this.load.image('pika', 'images/pika.png');
  }

  create() {
    this.pika = this.add.sprite(400,300,'pika');
  }

  update() {
    this.pika.rotation += .01;
  }
}

const game = new Game();
